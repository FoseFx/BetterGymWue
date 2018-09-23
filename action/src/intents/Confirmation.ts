import {Conversation} from "actions-on-google";

export function ConfirmationIntent(conv: Conversation<any>, params, confirmationGranted) {
    console.log("CONFIRMATION", conv);
    conv.close(confirmationGranted);
}