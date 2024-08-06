class PollStorage {
    polls;

    constructor() {
        this.polls = new Map();
    }

    /**
     * ### PollStorage getAll
     * @description Get all stored polls.
     * @returns {*} list PollModel[]
     */
    getAll() {
        return Array.from(this.polls.values());
    }

    /**
     * ### PollStorage addOne
     * @description Store a single poll.
     * @param {*} poll PollModel
     */
    addOne(poll) {
        this.polls.set(poll.id, poll);
    }

    /**
     * ### PollStorage getOneById
     * @description Get a single poll given an id.
     * @param {*} id UUID
     * @returns PollModel | undefined (not found)
     */
    getOneById(id) {
        return this.polls.get(id);
    }

    /**
     * ### PollStorage updateOne
     * @description Update a single poll.
     * @param {*} poll PollModel
     */
    updateOne(poll) {
        this.polls.set(poll.id, poll);
    }
}

export const pollStorage = new PollStorage();
