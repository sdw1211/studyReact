"use strict";

let comments = [{name:"Anne Droid", body:"I wanna know what love is...", key:1},
    {name:"Antonio Seo", body:"I love you.", key:2},
    {name:"Rosaria Huh", body:"me too.", key:3}
];

module.exports = {
    add : (comment) => {
        const generateKey = () => comments.length + 1;

        comment.key = generateKey();
        comments.push(comment);
    }, remove : (key) => {
        const commentIndexToDelete = comments.findIndex(x => x.key === key);
        const isExistedComment = (index) => index >= 0;
        const DELETE_ONCE = 1;
        const removeComment = (commentIndexToDelete) => comments.splice(
            commentIndexToDelete, DELETE_ONCE);
    
        if (isExistedComment(commentIndexToDelete)) {
            removeComment(commentIndexToDelete);
        }
    }, get : () => comments
}