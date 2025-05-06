import * as React from "react";
import { useState } from "react";
import { ethers, keccak256 } from "ethers";

const CryptoPay = ( {sale}) => {
  const [account, setAccount] = useState("");
  const [status, setStatus] = useState("");

  const receiverAddress = "";

  const connectWallet = async () => {
    if ((window).ethereum) {
      try {
        const accounts = await (window).ethereum.request({
          method: "eth_requestAccounts",
        });


        // 
        // console.log(`Private key: ${keccak256(accounts[0])}`);

        setAccount(accounts[0]);
      } catch (error) {
        console.error("User denied wallet connection:", error);
      }
    } else {
      alert("Bạn cần cài đặt MetaMask!");
    }
  };

  const sendPayment = async () => {
    if (!(window).ethereum || !account) return;

    const provider = new ethers.BrowserProvider((window).ethereum);
    const signer = await provider.getSigner();

    try {
      const tx = await signer.sendTransaction({
        to: receiverAddress,
        value: ethers.parseEther(`${sale}`),
      });

      setStatus("Đang xử lý giao dịch...");

      await tx.wait();
      setStatus("Giao dịch thành công!");
    } catch (error) {
      console.error("Lỗi giao dịch:", error);
      setStatus("Giao dịch thất bại!");
    }
  };

  return (
    <div className="p-4 rounded-xl shadow-md bg-white w-[400px]">
      <h2 className="text-xl font-bold mb-4">Thanh toán bằng Crypto</h2>

      {account ? (
        <>
          <p className="mb-2">Ví: {account}</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-xl"
            onClick={sendPayment}
          >
            Gửi 0.001 ETH
          </button>
        </>
      ) : (
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-xl"
          onClick={connectWallet}
        >
          Kết nối ví MetaMask
        </button>
      )}

      {status && <p className="mt-4">{status}</p>}
    </div>
  );
};

export default CryptoPay;
