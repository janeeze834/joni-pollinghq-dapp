<a id="readme-top"></a>
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/janeeze834/joni-pollinghq-dapp">
    <img src="docs/images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Polling System dapp</h3>

  <p align="center">
    The Polling System dapp documentation.
  </p>
</div>

## About
<p>
    Polling System is a decentralized application (dapp) powered by <a href="https://docs.cartesi.io/cartesi-rollups/1.3/">Cartesi</a> rollups technology.
</p>
<p> 
    This dapp allows users to create, manage, and participate in polls with the benefits of blockchain technology, including transparency, security, and decentralization.
</p>

## Getting Started

Follow these instructions to set up the dapp locally.

### Prerequisites

Ensure you have the following packages installed on your PC:

* [Node.js](https://nodejs.org/en), [npm](https://docs.npmjs.com/cli/v10/configuring-npm/install), [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable) 
* [Docker](https://docs.docker.com/get-docker/)
* [Cartesi CLI](https://docs.cartesi.io/cartesi-rollups/1.3/development/migration/#install-cartesi-cli)
  ```sh
  npm install -g @cartesi/cli
  ```

### Installation

1. Clone this repository:
   ```sh
   git clone https://github.com/janeeze834/joni-pollinghq-dapp
   ```
2. Install NPM packages:
   ```sh
   yarn install
   ```
3. Build and run the dapp using `cartesi-cli`:
   ```sh
   cartesi build 
   ```
   Then:
   ```sh
   cartesi run 
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

Here are examples of interacting with the dapp:

### Advanced Handlers
* #### createPoll
  ```js
    description — Create a new poll.
    param data — {creator: address ("0x..."), question: string, options: string[]}
  ```
  Data sample:
  ```json
    {
        "action": "createPoll", 
        "data": {
            "creator": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "question": "What's your favorite color?",
            "options": ["Red", "Blue", "Green"]
        }
    }
  ```
  Hex sample:
  ``` 
  0x7b22616374696f6e223a2270726561746522706f6c6c223a7b2263726561746f72223a22307866333946643665353161616438384636463463653661423838323732373963666646623932323636222c207175657374696f6e223a2257732079657374206661766f7269746520636f6c6f72223a227265642c2062736c7565223a5b22726564222c20726c6f736522c2072656575225d7d7d
  ```
  Interact:
    - *Via `Cartesi CLI`*:
    ```sh
    cartesi send generic \
        --dapp=0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e \
        --chain-id=31337 \
        --rpc-url=http://127.0.0.1:8545 \
        --mnemonic-passphrase='test test test test test test test test test test test junk' \
        --input=0x7b22616374696f6e223a2270726561746522706f6c6c223a7b2263726561746f72223a22307866333946643665353161616438384636463463653661423838323732373963666646623932323636222c207175657374696f6e223a2257732079657374206661766f7269746520636f6c6f72223a227265642c2062736c7565223a5b22726564222c20726c6f736522c2072656575225d7d7d
    ```
    - *Via `cast`*:
    ```sh
    cast send 0x59b22D57D4f067708AB0c00552767405926dc768 "addInput(address,bytes)" 0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e 0x7b22616374696f6e223a2270726561746522706f6c6c223a7b2263726561746f72223a22307866333946643665353161616438384636463463653661423838323732373963666646623932323636222c207175657374696f6e223a2257732079657374206661766f7269746520636f6c6f72223a227265642c2062736c7565223a5b22726564222c20726c6f736522c2072656575225d7d7d --mnemonic 'test test test test test test test test test test test junk'
    ```

* #### vote
  ```js
    description — Vote in a poll.
    param data — {pollId: UUID, optionIndex: number}
  ```
  Data sample:
  ```json
    {
        "action": "vote", 
        "data": {
            "pollId": "d8c04a7b-e207-4dfb-a1d2-c64e9d09c9e5",
            "optionIndex": 1
        }
    }
  ```
  Hex sample:
  ``` 
  0x7b22616374696f6e223a2276696e6574223a7b70726f6c4c6464223a2264386330346137622d653230372d346466622d613164322d633634653964303963396535222c2073697469783a317d7d
  ``` 
  Interact:
    - *Via `Cartesi CLI`*:
    ```sh
    cartesi send generic \
        --dapp=0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e \
        --chain-id=31337 \
        --rpc-url=http://127.0.0.1:8545 \
        --mnemonic-passphrase='test test test test test test test test test test test junk' \
        --input=0x7b22616374696f6e223a2276696e6574223a7b70726f6c4c6464223a2264386330346137622d653230372d346466622d613164322d633634653964303963396535222c2073697469783a317d7d
    ```
    - *Via `cast`*:
    ```sh
    cast send 0x59b22D57D4f067708AB0c00552767405926dc768 "addInput(address,bytes)" 0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e 0x7b22616374696f6e223a2276696e6574223a7b70726f6c4c6464223a2264386330346137622d653230372d346466622d613164322d633634653964303963396535222c2073697469783a317d7d --mnemonic 'test test test test test test test test test test test junk'
    ```

### Inspect Handlers
* #### getAllPolls
  ```js
    description — Get all polls.
  ```
  Returned hex sample:
  ```json
    {
        "status": "Accepted",
        "exception_payload": null,
        "reports": [
            {
                "payload": "0x..."
            }
        ],
        "processed_input_count": 2
    }
  ```
  Converted payload sample:
  ```json 
    [
        {
            "id": "d8c04a7b-e207-4dfb-a1d2-c64e9d09c9e5",
            "creator": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "question": "What's your favorite color?",
            "options": ["Red", "Blue", "Green"],
            "votes": [0, 1, 0]
        }
    ]
  ```
  Interact:
    - Access the Cartesi inspect endpoint in your browser:
    ```sh 
    http://localhost:8080/inspect/getAllPolls
    ```

* #### getPollById
  ```js
    description — Get a poll by its ID.


    param data — {pollId: UUID}
  ```
  Data sample:
  ```json
    {
        "action": "getPollById", 
        "data": {
            "pollId": "d8c04a7b-e207-4dfb-a1d2-c64e9d09c9e5"
        }
    }
  ```
  Returned hex sample:
  ```json
    {
        "status": "Accepted",
        "exception_payload": null,
        "reports": [
            {
                "payload": "0x..."
            }
        ],
        "processed_input_count": 1
    }
  ```
  Converted payload sample:
  ```json 
    {
        "id": "d8c04a7b-e207-4dfb-a1d2-c64e9d09c9e5",
        "creator": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        "question": "What's your favorite color?",
        "options": ["Red", "Blue", "Green"],
        "votes": [0, 1, 0]
    }
  ```
  Interact:
    - Access the Cartesi inspect endpoint in your browser:
    ```sh 
    http://localhost:8080/inspect/getPollById/{pollId}
    ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributing

Contributions are welcome! Please fork the repo and submit a pull request.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Victor Ifeanyi Chukwujiobi - [Your Email](mailto:your-email@example.com)

Project Link: [https://github.com/your-repo/polling-system-dapp](https://github.com/your-repo/polling-system-dapp)
