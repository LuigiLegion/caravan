// Listeners
// Listen for messages from tabs
browser.runtime.onMessage.addListener(function(message, sender) {
  // Validate message structure
  if (message.from === 'content' && message.subject === 'showPageAction') {
    // Enable page action for requesting tab
    browser.pageAction.show(sender.tab.id);
  }
});
