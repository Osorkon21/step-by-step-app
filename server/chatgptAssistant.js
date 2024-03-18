// {
//   "assistantId": "asst_EzUx6CE0ukBXpgj5qlQcqacP",
//   "name": "Helper",
//   "instructions": "A user will tell you about something they want to do. For Example 'I want to build a wood chair'.  Provide the user with a list of up to 10 steps so they can actualize this thing.  Save the steps in an array of objects  with each step as an object in the array.  For each step object include: id (corresponds to its order, ex: 1), title (ex.. Choose the Right guitar), substeps (as an array with each sentence as a string)",
//   "tools": [],
//   "model": "gpt-4-1106-preview"
// }

const OpenAI = require("openai");
require("dotenv").config();

const fsPromises = require("fs").promises;



// Create a OpenAI connection
const secretKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({
  apiKey: secretKey
})


// NEEDS TO BE CONVERTED TO STATEFUL VARIABLE - get the input from the user in Client side - GOAL input field
async function askQuestion(question) {
  return new Promise((resolve, reject) => {
    readline.question(question, (answer) => {
      resolve(answer)
    });
  });
}

async function generateSteps(data) {
  try {
    const userGoal = data.userGoal
    console.log("inside generateSteps", data.userGoal)
    let assistantId;
    const assistantFilePath = "./assistant.json";

    // Check if the assistant.json file exists
    try {
      const assistantData = await fsPromises.readFile(
        assistantFilePath,
        "utf8"
      );
      assistantDetails = JSON.parse(assistantData);
      assistantId = assistantDetails.assistantId;
      console.log("\nExisting assistant detected.\n");
    } catch (error) {
      // If file does not exist or there is an error in reading it, create a new assistant
      console.log("No existing assistant detected, creating new.\n");
      const assistantConfig = {
        name: "Helper",
        instructions:
          "You are a helpful assistant that provides a list of up to 10 steps to fulfill an inputted goal, which designed to ouput JSON. Sample response,  title: (User's goal), steps: .",
        tools: [], // configure the retrieval tool to retrieve files in the future
        model: "gpt-3.5-turbo-1106",
      };

      // , which designed to ouput JSON
      // This would Create assistant if it didn't exist
      const assistant = await openai.beta.assistants.create(assistantConfig);
      assistantDetails = { assistantId: assistant.id, ...assistantConfig };

      // Save the assistant details to assistant.json
      await fsPromises.writeFile(
        assistantFilePath,
        JSON.stringify(assistantDetails, null, 2)
      );
      assistantId = assistantDetails.assistantId;
    }

    // Log the first greeting
    console.log(
      `Hello there, I am: ${assistantDetails.name}`
    );

    // Create a thread using the assistantId
    const thread = await openai.beta.threads.create();
    console.log(thread)
+
    // const userQuestion = 
    await openai.beta.threads.messages.create(thread.id,{
      role: "user",
      content: userGoal}); //  NEED TO HAVE userGoal 

    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistantId
    })

    // PULLING MECHANISM which checks status
    let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    while(runStatus.status !== "completed") {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);

      if (["failed", "cancelled", "expired"].includes(runStatus.status)) {
        console.log(`Run status ${runStatus.status}. Unable to complet the request.`);
        break;
      }
    }
    // retrieve all messages
    const messages = await openai.beta.threads.messages.list(thread.id);
    // LAST MESSAGE
    const lastMessage = messages.data.filter((message) => message.run_id
    === run.id && message.role === "assistant").pop()

    if(lastMessage) {
      
      console.log(`${lastMessage.content[0].text.value} \n`)
      console.log(typeof(lastMessage), lastMessage)
      if (lastMessage.content[0].text.value.match(/^```json/)) {
        lastMessage.content[0].text.value = lastMessage.content[0].text.value.replace("```json", "").replace("```", "");
        console.log(`${lastMessage.content[0].text.value} \n`)

      }
    } else if(!["failed", "cancelled", "expired"].includes(runStatus.status)) {
      console.log("No response received from assistant")
    }

    return lastMessage
  } catch (error) {
    console.error(error);
  }
}

async function explainStep(data){
  try {
    const goalTitle = data.goalTitle;
    const stepTitle = data.stepTitle;
    const stepInfo = `I want to know more about the step: ${stepTitle} in the goal: ${goalTitle}`;

    console.log("inside explainStep", data.userGoal, data.stepTitle)
    let explainAssistantId;
    const assistantFilePath = "./explain.assistant.json";

    // Check if the assistant.json file exists
    try {
      const assistantData = await fsPromises.readFile(
        assistantFilePath,
        "utf8"
      );
      assistantDetails = JSON.parse(assistantData);
      assistantId = assistantDetails.assistantId;
      console.log("\nExisting assistant detected.\n");
    } catch (error) {
      // If file does not exist or there is an error in reading it, create a new assistant
      console.log("No existing assistant detected, creating new.\n");
      const assistantConfig = {
        name: "Explain",
        instructions:
          "You are a helpful assistant that provides additional info on one step of a goal.  You will be provided with a goal title and a step title.",
        tools: [], // configure the retrieval tool to retrieve files in the future
        model: "gpt-3.5-turbo-1106",
      };

      // , which designed to ouput JSON
      // This would Create assistant if it didn't exist
      const assistant = await openai.beta.assistants.create(assistantConfig);
      assistantDetails = { assistantId: assistant.id, ...assistantConfig };

      // Save the assistant details to assistant.json
      await fsPromises.writeFile(
        assistantFilePath,
        JSON.stringify(assistantDetails, null, 2)
      );
      assistantId = assistantDetails.assistantId;
    }

    // Log the first greeting
    console.log(
      `Hello there, I am: ${assistantDetails.name}`
    );

    // Create a thread using the assistantId
    const thread = await openai.beta.threads.create();
    console.log(thread)
+
    // const userQuestion = 
    await openai.beta.threads.messages.create(thread.id,{
      role: "user",
      content: stepInfo}); //  NEED TO HAVE userGoal 

    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistantId
    })

    // PULLING MECHANISM which checks status
    let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    while(runStatus.status !== "completed") {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);

      if (["failed", "cancelled", "expired"].includes(runStatus.status)) {
        console.log(`Run status ${runStatus.status}. Unable to complet the request.`);
        break;
      }
    }
    // retrieve all messages
    const messages = await openai.beta.threads.messages.list(thread.id);
    // LAST MESSAGE
    const lastMessage = messages.data.filter((message) => message.run_id
    === run.id && message.role === "assistant").pop()

    if(lastMessage) {
      
      console.log(`${lastMessage.content[0].text.value} \n`)
      console.log(typeof(lastMessage), lastMessage)
      if (lastMessage.content[0].text.value.match(/^```json/)) {
        lastMessage.content[0].text.value = lastMessage.content[0].text.value.replace("```json", "").replace("```", "");
        console.log(`${lastMessage.content[0].text.value} \n`)

      }
    } else if(!["failed", "cancelled", "expired"].includes(runStatus.status)) {
      console.log("No response received from assistant")
    }

    return lastMessage
  } catch (error) {
    console.error(error);
  }
}

module.exports = { generateSteps, explainStep };
// Call the main function
// main();



//     // THIS WOULDN'T BE NEEDED IF WE AREN'T GOING TO ALLOW USER TO - RE-ASK
//     // Use keepAsking as state for keep asking questions
//     let keepAsking = true;
//     while (keepAsking) {
//       const action = await askQuestion(
//         "Are you satisfied with the steps provided?\n1. Yes looks Great!\n2. No, I would like you to change things.\nEnter your choice (1 or 2): "
//       );


//       /*
//         1. user is happy - no more quesions are asked or updates need
//           -keepAsking = false
//         2. user not happy - ask user to tell you what they want changed
//           - user responds in inputfield - additional info
          
//       */

//       if (action === "1") {
//         // get step data
//           async function getStepData(thread_id, message_id) {
//             try {
//               const response = await openai.retrieveMessage({
//                 thread: thread_id,
//                 message: message_id
//               });
//               const stepData = response.data; // The variable 'stepData' contains the message data.
//               console.log(stepData);
// ///////////////////////////////////////////////////////NOT FINISHED/////////////
//               // You can now push a portion of 'stepData' to your database
//               // ...

//             } catch (error) {
//               console.error('Error retrieving message:', error);
//             }
//           }

//           // You need to replace 'YOUR_THREAD_ID' and 'YOUR_MESSAGE_ID' with actual IDs.
//           console.log(thread.id, thread.messages.pop())
//           getStepData(thread.id, thread.messages.pop());
                  

//         console.log("Helper is Done");
//       }

//       if (action === "1") {
//         let continueAskingQuestion = true;

//         while (continueAskingQuestion) {
//           const userQuestion = await askQuestion("\nIs there a step you want more info on? ");

//           // Pass in the user question into the existing thread
//           await openai.beta.threads.messages.create(thread.id, {
//             role: "user",
//             content: userQuestion,
//           });

//           // Create a run
//           const run = await openai.beta.threads.runs.create(thread.id, {
//             assistant_id: assistantId,
//           });

//           // Imediately fetch run-status, which will be "in_progress"
//           let runStatus = await openai.beta.threads.runs.retrieve(
//             thread.id,
//             run.id
//           );

//           // Polling mechanism to see if runStatus is completed
//           while (runStatus.status !== "completed") {
//             await new Promise((resolve) => setTimeout(resolve, 1000));
//             runStatus = await openai.beta.threads.runs.retrieve(
//               thread.id,
//               run.id
//             );

//             // Check for failed, cancelled, or expired status
//             if (["failed", "cancelled", "expired"].includes(runStatus.status)) {
//               console.log(
//                 `Run status is '${runStatus.status}'. Unable to complete the request.`
//               );
//               break; // Exit the loop if the status indicates a failure or cancellation
//             }
//           }

//           // Get the last assistant message from the messages array
//           const messages = await openai.beta.threads.messages.list(thread.id);

//           // Find the last message for the current run
//           const lastMessageForRun = messages.data
//             .filter(
//               (message) =>
//                 message.run_id === run.id && message.role === "assistant"
//             )
//             .pop();

//           // If an assistant message is found, console.log() it
//           if (lastMessageForRun) {
//             console.log(`${lastMessageForRun.content[0].text.value} \n`);
//           } else if (
//             !["failed", "cancelled", "expired"].includes(runStatus.status)
//           ) {
//             console.log("No response received from the assistant.");
//           }

//           // Ask if the user wants to ask another question
//           const continueAsking = await askQuestion(
//             "Do you want to ask another question? (yes/no) "
//           );
//           continueAskingQuestion =
//             continueAsking.toLowerCase() === "yes" ||
//             continueAsking.toLowerCase() === "y";
//         }
//       }

//       // Outside of action "1", ask if the user wants to continue with any action
//       const continueOverall = await askQuestion(
//         "Do you want to perform another action? (yes/no) "
//       );
//       keepAsking =
//         continueOverall.toLowerCase() === "yes" ||
//         continueOverall.toLowerCase() === "y";

//       // If the keepAsking state is falsy show an ending message
//       if (!keepAsking) {
//         console.log("Alrighty then, see you next time!\n");
//       }
//     }
//     // close the readline
//     readline.close();






//////////////////////////////////////////////////////////////

