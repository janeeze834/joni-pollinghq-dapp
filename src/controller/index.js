import { PollController } from './polling-controller';

const pollController = new PollController();

export const controller = {
    createPoll: pollController.createPoll,
    getAllPolls: pollController.getAllPolls,
    getPollById: pollController.getPollById,
    addOptionToPoll: pollController.addOptionToPoll,
    voteOnPoll: pollController.voteOnPoll,
};
