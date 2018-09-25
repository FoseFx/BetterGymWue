"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function hasScreen(conv) {
    return conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT');
}
exports.hasScreen = hasScreen;
