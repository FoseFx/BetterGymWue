import {Conversation} from "actions-on-google";

export function hasScreen(conv: Conversation<any>) {
    return conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT');
}