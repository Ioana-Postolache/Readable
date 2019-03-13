# Readable
Readable is a  content and comment web app. Users will be able to post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users will also be able to edit and delete posts and comments.

## Start Project
After adding the dependencies (by running "npm  install"), the app can be launched by running "npm start".

## Default (Root)
- lists all available categories, which should link to a category view for that category
- lists  all of the posts
- has control for changing the sort method for the list, including at minimum, order by voteScore and order by timestamp
- has control for adding a new post

## Category View
- identical to the default view, but filtered to only include posts with the selected category

## Post Detail View
- shows the details of a post, including: Title, Body, Author, timestamp (in user readable format), and vote score
- lists all of the comments for that post
- has controls to edit or delete the post
- has control to add a new comment.
- comments have controls for editing or deleting

## Create/Edit View
- has a form to create new post or edit existing posts
- when editing, existing data is populated in the form

## Post/Comment UI
Posts and comments, in all views where they are displayed, display their current score and have controls to increment or decrement the voteScore for the object. Posts display the number of comments associated with the post.
