import mongoose, { Schema, model, models } from "mongoose";

const VoteSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    proposalId: {
      type: Schema.Types.ObjectId,
      ref: "Proposal",
      required: true,
    },
    voteType: {
      type: String,
      enum: ["up", "down"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to ensure one vote per user per proposal
VoteSchema.index({ userId: 1, proposalId: 1 }, { unique: true });

const Vote = models.Vote || model("Vote", VoteSchema);

export default Vote;
