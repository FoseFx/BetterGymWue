import {Conversation, SignIn} from "actions-on-google";

export function SignInIntent(conv: Conversation<any>, params, signin) {
    return signin.status;
}