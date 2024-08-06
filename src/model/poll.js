import crypto from 'node:crypto';

export class Poll {
    id;
    owner;
    question;
    options;
    votes;
    createdAt;

    /**
     * ### Poll model required data
     * @param {*} owner address (e.g., "0x...")
     * @param {*} question string
     * @param {*} options array of strings
     */
    constructor(owner, question, options) {
        this.id = crypto.randomUUID();
        this.owner = owner;
        this.question = question;
        this.options = options;
        this.votes = new Array(options.length).fill(0); // Initialize votes for each option
        this.createdAt = Date.now();
    }

    /**
     * ### Poll getData
     * @description Returns basic poll data.
     * @returns poll { 
            id: UUID, owner: address (e.g., "0x..."), 
            question: string, 
            options: string[], 
            votes: number[], 
            createdAt: number 
        }
     */
    getData() {
        return {
            id: this.id,
            owner: this.owner,
            question: this.question,
            options: this.options,
            votes: this.votes,
            createdAt: this.createdAt,
        };
    }

    /**
     * ### Poll getOptions
     * @description Returns all poll options.
     * @returns string[]
     */
    getOptions() {
        return this.options;
    }

    /**
     * ### Poll addOption
     * @description Add a new option to the poll.
     * @param {*} option string
     */
    addOption(option) {
        this.options.push(option);
        this.votes.push(0); // Initialize votes for the new option
    }

    /**
     * ### Poll vote
     * @description Cast a vote for an option.
     * @param {*} optionIndex number
     */
    vote(optionIndex) {
        if (optionIndex < 0 || optionIndex >= this.options.length) {
            throw new Error('Invalid option index');
        }
        this.votes[optionIndex]++;
    }
}
