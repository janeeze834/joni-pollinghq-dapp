import { Poll } from '../model/poll';
import { RollupStateHandler } from '../shared/rollup-state-handler';
import { pollStorage } from '../storage/poll';

export class PollController {
    /**
     * ### PollController createPoll
     * @description Create a new poll.
     * @param {*} data {owner: address ("0x..."), question: string, options: array of strings}
     */
    async createPoll(data) {
        return await RollupStateHandler.advanceWrapper(() => {
            const newPoll = new Poll(data.owner, data.question, data.options);
            pollStorage.addOne(newPoll);

            return {
                ok: true,
                message: `Poll created successfully!`,
                data: newPoll.getData(),
            };
        });
    }

    /**
     * ### PollController getAllPolls
     * @description Get all polls.
     */
    async getAllPolls() {
        return await RollupStateHandler.inspectWrapper(() =>
            pollStorage.getAll()
        );
    }

    /**
     * ### PollController getPollById
     * @description Get a poll by given id.
     * @param {*} data poll id (UUID)
     */
    async getPollById(data) {
        const pollId = data[0];
        const storageRequest = pollStorage.getOneById(pollId);

        if (!storageRequest?.id)
            return await RollupStateHandler.handleReport({
                error: `Poll not found for id '${pollId}'.`,
            });

        return await RollupStateHandler.inspectWrapper(() => ({
            data: {
                details: storageRequest.getData(),
                votes: storageRequest.getVotes(),
            },
        }));
    }

    /**
     * ### PollController addOptionToPoll
     * @description Add an option to an existing poll.
     * @param {*} data {pollId: UUID, option: string}
     */
    async addOptionToPoll(data) {
        const { pollId, option } = data;
        const poll = pollStorage.getOneById(pollId);

        if (!poll?.id)
            return await RollupStateHandler.handleReport({
                error: `Poll not found for id '${pollId}'.`,
            });

        poll.addOption(option);
        pollStorage.update(poll);

        return {
            ok: true,
            message: `Option added successfully!`,
            data: poll.getData(),
        };
    }

    /**
     * ### PollController voteOnPoll
     * @description Cast a vote on a poll.
     * @param {*} data {pollId: UUID, optionIndex: number}
     */
    async voteOnPoll(data) {
        const { pollId, optionIndex } = data;
        const poll = pollStorage.getOneById(pollId);

        if (!poll?.id)
            return await RollupStateHandler.handleReport({
                error: `Poll not found for id '${pollId}'.`,
            });

        if (optionIndex < 0 || optionIndex >= poll.getOptions().length)
            return await RollupStateHandler.handleReport({
                error: `Invalid option index '${optionIndex}'.`,
            });

        poll.vote(optionIndex);
        pollStorage.update(poll);

        return {
            ok: true,
            message: `Vote cast successfully!`,
            data: poll.getData(),
        };
    }
}
