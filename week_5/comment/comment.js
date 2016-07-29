"use strict";

let comments = [{name:"Anne Droid", body:"I wanna know what love is...", key:1},
    {name:"Antonio Seo", body:"I love you.", key:2},
    {name:"Rosaria Huh", body:"me too.", key:3}
];

module.exports = {
    add : (comment) => {
        let generateKey = () => comments.length + 1;

        comment.key = generateKey();
        comments.push(comment);
    }, delete : (key) => {
        let commentIndexToDelete = comments.findIndex(x => x.key === key);
        const DELETE_ONCE = 1;
        let isExistedComment = (index) => index >= 0;
    
        if (isExistedComment(commentIndexToDelete)) {
            comments.splice(commentIndexToDelete, DELETE_ONCE);
        }
    }, get : () => comments
}