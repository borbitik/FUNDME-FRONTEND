# FundMe Frontend

A decentralized funding application frontend built with Next.js and Ethers.js that interacts with a FundMe smart contract on the Ethereum blockchain.

## Features

- Wallet Connection with MetaMask
- View Contract Balance
- Fund Contract with ETH
- Withdraw Funds (for contract owner)
- Real-time balance updates

## Prerequisites

- Node.js (v14 or later)
- MetaMask wallet extension
- Access to an Ethereum network (testnet recommended)

## Setup

1. Clone the repository:
```bash
git clone https://github.com/borbitik/FUNDME-FRONTEND
cd fundme-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file and add your contract address:
```
NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

## Usage

1. Connect your MetaMask wallet by clicking the "Connect Wallet" button
2. View the current contract balance
3. Enter an amount in ETH to fund the contract
4. Click "Fund Contract" to send ETH
5. If you're the contract owner, use "Withdraw Funds" to withdraw the balance

## Technologies Used

- Next.js 13 (App Router)
- Ethers.js
- TypeScript
- Tailwind CSS
- MetaMask

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
