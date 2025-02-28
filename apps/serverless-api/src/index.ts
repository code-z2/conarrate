import express from "express";
import serverless from "serverless-http";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";
import {
  Story,
  CreateStoryInput,
  UpdateStoryInput,
  AddDataItemInput,
  AddVoteInput,
  Vote,
} from "./types/story";

const app = express();
app.use(express.json());

const dynamoDb = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(dynamoDb);
const STORIES_TABLE = process.env.STORIES_TABLE || "";

// Get story by ID
app.get("/stories/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await docClient.send(
      new GetCommand({
        TableName: STORIES_TABLE,
        Key: { id },
      })
    );

    if (!result.Item) {
      return res.status(404).json({ error: "Story not found" });
    }

    res.json(result.Item as Story);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Could not retrieve story" });
  }
});

// Create new story
app.post("/stories", async (req, res) => {
  const { fullData, imageUrl, dataItems = [] } = req.body as CreateStoryInput;

  const story: Story = {
    id: uuidv4(),
    imageUrl,
    fullData,
    dataItems,
    lastUpdatedAt: new Date().toISOString(),
    archived: false,
    votes: [],
  };

  try {
    await docClient.send(
      new PutCommand({
        TableName: STORIES_TABLE,
        Item: story,
      })
    );

    res.json(story);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Could not create story" });
  }
});

// Update story data
app.patch("/stories/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body as UpdateStoryInput;

  try {
    const updateExpression: Array<string> = [];
    const expressionAttributeNames: Record<string, string> = {};
    const expressionAttributeValues: Record<string, any> = {};

    if (updates.fullData !== undefined) {
      updateExpression.push("#fullData = :fullData");
      expressionAttributeNames["#fullData"] = "fullData";
      expressionAttributeValues[":fullData"] = updates.fullData;
    }

    if (updates.archived !== undefined) {
      updateExpression.push("#archived = :archived");
      expressionAttributeNames["#archived"] = "archived";
      expressionAttributeValues[":archived"] = updates.archived;
    }

    updateExpression.push("#lastUpdatedAt = :lastUpdatedAt");
    expressionAttributeNames["#lastUpdatedAt"] = "lastUpdatedAt";
    expressionAttributeValues[":lastUpdatedAt"] = new Date().toISOString();

    const result = await docClient.send(
      new UpdateCommand({
        TableName: STORIES_TABLE,
        Key: { id },
        UpdateExpression: `SET ${updateExpression.join(", ")}`,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: "ALL_NEW",
      })
    );

    res.json(result.Attributes as Story);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Could not update story" });
  }
});

// Add data item to story
app.post("/stories/:id/data-items", async (req, res) => {
  const { id } = req.params;
  const { content, referenceUrl, writtenby } = req.body as AddDataItemInput;

  try {
    const result = await docClient.send(
      new GetCommand({
        TableName: STORIES_TABLE,
        Key: { id },
      })
    );

    if (!result.Item) {
      return res.status(404).json({ error: "Story not found" });
    }

    const story = result.Item as Story;
    const newDataItem = {
      id: story.dataItems.length + 1,
      content,
      referenceUrl,
      writtenby,
    };

    await docClient.send(
      new UpdateCommand({
        TableName: STORIES_TABLE,
        Key: { id },
        UpdateExpression:
          "SET #dataItems = list_append(#dataItems, :newItem), #lastUpdatedAt = :lastUpdatedAt",
        ExpressionAttributeNames: {
          "#dataItems": "dataItems",
          "#lastUpdatedAt": "lastUpdatedAt",
        },
        ExpressionAttributeValues: {
          ":newItem": [newDataItem],
          ":lastUpdatedAt": new Date().toISOString(),
        },
      })
    );

    res.json(newDataItem);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Could not add data item" });
  }
});

// Check if user has voted
app.get("/stories/:id/votes/:user", async (req, res) => {
  const { id, user } = req.params;

  try {
    const result = await docClient.send(
      new GetCommand({
        TableName: STORIES_TABLE,
        Key: { id },
      })
    );

    if (!result.Item) {
      return res.status(404).json({ error: "Story not found" });
    }

    const story = result.Item as Story;
    const hasVoted = story.votes.some((vote) => vote.user === user);

    res.json({ hasVoted });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Could not check vote status" });
  }
});

// Get user's vote
// Get story's total vote count
app.get("/stories/:id/votes", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await docClient.send(
      new GetCommand({
        TableName: STORIES_TABLE,
        Key: { id },
      })
    );

    if (!result.Item) {
      return res.status(404).json({ error: "Story not found" });
    }

    const story = result.Item as Story;
    const totalVotes = story.votes.reduce((sum, vote) => sum + vote.vote, 0);

    res.json({ totalVotes });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Could not get vote count" });
  }
});

// Add or update vote
app.post("/stories/:id/vote", async (req, res) => {
  const { id } = req.params;
  const { user, vote } = req.body as AddVoteInput;

  if (vote !== 1 && vote !== -1) {
    return res.status(400).json({ error: "Vote must be either 1 or -1" });
  }

  try {
    const result = await docClient.send(
      new GetCommand({
        TableName: STORIES_TABLE,
        Key: { id },
      })
    );

    if (!result.Item) {
      return res.status(404).json({ error: "Story not found" });
    }

    const story = result.Item as Story;
    const existingVoteIndex = story.votes.findIndex((v) => v.user === user);

    if (existingVoteIndex !== -1) {
      return res.status(400).json({ error: "User has already voted" });
    }

    const newVote: Vote = { user, vote };

    await docClient.send(
      new UpdateCommand({
        TableName: STORIES_TABLE,
        Key: { id },
        UpdateExpression:
          "SET #votes = list_append(#votes, :newVote), #lastUpdatedAt = :lastUpdatedAt",
        ExpressionAttributeNames: {
          "#votes": "votes",
          "#lastUpdatedAt": "lastUpdatedAt",
        },
        ExpressionAttributeValues: {
          ":newVote": [newVote],
          ":lastUpdatedAt": new Date().toISOString(),
        },
      })
    );

    res.json(newVote);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Could not add vote" });
  }
});

export const handler = serverless(app);
