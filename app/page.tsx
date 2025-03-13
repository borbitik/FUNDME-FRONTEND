'use client'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../constants'

export default function Home() {
  const [isConnected, setIsConnected] = useState(false)
  const [account, setAccount] = useState('')
  const [balance, setBalance] = useState('0')
  const [fundAmount, setFundAmount] = useState('')

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        }) as string[]
        if (accounts && accounts.length > 0) {
          console.log('accounts: ', accounts.length)
          setAccount(accounts[0])
        }
        setIsConnected(true)
        await getContractBalance()
      } else {
        alert('Please install MetaMask!')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const getContractBalance = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const balance = await provider.getBalance(CONTRACT_ADDRESS)
      setBalance(ethers.utils.formatEther(balance))
    } catch (error) {
      console.error(error)
    }
  }

  const fundContract = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)
      
      const tx = await contract.fund({
        value: ethers.utils.parseEther(fundAmount),
      })
      await tx.wait()
      await getContractBalance()
    } catch (error) {
      console.error(error)
    }
  }

  const withdrawFunds = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)
      
      const tx = await contract.withdraw()
      await tx.wait()
      await getContractBalance()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        {!isConnected ? (
          <button
            onClick={connectWallet}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Connect Wallet
          </button>
        ) : (
          <div className="space-y-4">
            <p>Connected Account: {account}</p>
            <p>Contract Balance: {balance} ETH</p>
            <div>
              <input
                type="text"
                value={fundAmount}
                onChange={(e) => setFundAmount(e.target.value)}
                placeholder="Amount in ETH"
                className="border p-2 mr-2"
              />
              <button
                onClick={fundContract}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Fund Contract
              </button>
            </div>
            <button
              onClick={withdrawFunds}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Withdraw Funds
            </button>
          </div>
        )}
      </div>
    </main>
  )
}