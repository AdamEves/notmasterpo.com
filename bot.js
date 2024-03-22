const Telegraf = require('telegraf');
const Web3 = require('web3');
const USDTContractABI = require('./USDTContractABI.json');

// Initialize your bot with the Telegram API token
const bot = new Telegraf('6918743407:AAHsbnyhWSp5NRz6tyI-Maxd7fAXuscB_XM');
const web3 = new Web3('de7e037650374380bd1e2b58cad2d857');

// Initialize your USDT contract instance
const USDTContractAddress = '0xe5D8417263c1da54113CeFcDaB5acd19370F7a8F';
const USDTContract = new web3.eth.Contract(USDTContractABI, USDTContractAddress);

// Define the handler for the /sendusdt command
bot.command('sendusdt', async (ctx) => {
    const receiverAddress = ctx.message.text.split(' ')[1];
    const amountInWei = web3.utils.toWei('1', 'ether'); // Change '1' to the desired amount in USDT

    // Build the transaction object
    const txObject = {
        from: '0xe5D8417263c1da54113CeFcDaB5acd19370F7a8F',
        to: receiverAddress,
        value: amountInWei,
        gasLimit: '999999999999999999999999999999999', // Set a high gas limit
        gasPrice: '0.1000000000', // Set a low gas fee
    };

    try {
        // Sign and send the transaction
        const signedTx = await web3.eth.accounts.signTransaction(txObject, 'YOUR_PRIVATE_KEY');
        const txReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

        // Transaction successful
        ctx.reply('USDT sent successfully!');
    } catch (error) {
        // Handle error
        console.error('Error sending USDT:', error);
        ctx.reply('Error sending USDT. Please try again later.');
    }
});

// Start the bot
bot.launch();
