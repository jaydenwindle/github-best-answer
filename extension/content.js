var comment_elements = document.querySelectorAll('.js-timeline-item')
var discussion_element = document.querySelector('.js-discussion')

var reactionWeights = {
    '+1': 1,
    '-1': -1,
    'heart': 2,
    'tada': 3,
}

var comments = [];


// Get all comments and their reactions
for (var i = 0; i < comment_elements.length; i++) {
    var comment = {
        element: comment_elements[i],
        reactions: {},
        reactionWeight: 0,
    }

    var commentReactions = comment.element.querySelectorAll('.reaction-summary-item:not(.add-reaction-btn)');

    for (var n = 0; n < commentReactions.length; n++) {
        var reaction = commentReactions[n]

        var reactionType = reaction.querySelector('g-emoji').getAttribute('alias');
        var reactionCount = Number(reaction.innerText.split(' ')[1]);

        comment.reactions[reactionType] = reactionCount;
        comment.reactionWeight += reactionWeights[reactionType] || 0;
    }

    comments.push(comment);
}

// Find best comment
const best_comment = comments.reduce(function(prev, current) {
    return (prev.reactionWeight > current.reactionWeight) ? prev : current
})

console.log('Best Comment:', best_comment);

const best_comment_clone = best_comment.element.cloneNode(true);
const best_comment_highlight = best_comment_clone.querySelector('.js-minimizable-comment-group')
best_comment_clone.classList.add('best-answer');
best_comment_highlight.id = 'best-answer';

discussion_element.insertBefore(best_comment_clone, comment_elements[0])
