# All endpoints start with /api/

## Users

?page=1&per_page=10

> GET /users (auth, admin)

> GET /users/:id (auth)

> POST /users (auth, admin)

## Topics

> GET /topics

> POST /topics (auth, admin)

> PUT /topics/:id (auth, admin)

> GET /topics/:id

> DELETE /topics/:id (auth, admin)

> POST /topics/:id/like (auth)

> POST /topics/:id/unlike (auth)

## Replies

> GET /replies/:id (auth)

> POST /replies (auth) // this one contains two senerios: "reply to topic" and "reply to reply"

> POST /replies/:id/upvote

> POST /replies/:id/downvote

> PUT /replies/:id

## Notifications

?page=1&per_page=10&type=(unread/read)

> GET /notifications (auth)

> POST /notifications (auth)

> POST /notifications/:id/read (auth)

> DELETE /notifications/:id (auth)
