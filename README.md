"punch" list:
- Convert this file from a punch list to a readme.

STYLING:
- Suggestions?

BEFORE WE FORGET:
anything else?

A) MAJOR FUNCTIONALITY:
1) (stretch) provide a Tasker with almost all abilities of a user
  (creating a  account, logging in, participating in the
  job-scheduling negotiation, deleting a job, deleting themself)
2) If we don't want to do the stretch, then create an "admin" page
  with full CRUD-functionality for the Jobtype and Tasker Models.

B) MINOR FUNCTIONALITY (SPECIFIC):
2) put nav links on all pages to places like home, account details,
  or jobs
4) (PK) on jobs page, create a three-set toggle which'll show
  the following jobs according to their #jobDate attribute:
  (a) all of them, (b) past, and (c) future
5) (PK) separate "account" route into front-end & back-end?
6) (PK) put csrf middleware into a couple of routes, both
  front and back?
7) PK things: allow user to delete job &/or modify jobDate
(prob not, because sequelize disappears join PKs),
insert more nav links on each page, work on admin page,

C) MINOR FUNCTIONALITY (GENERAL):

D) HOUSEKEEPING:
1) shift image files "down" one level, as PK described earlier
2) delete superfluous paths
3) revisit naming conventions for paths?
4) delete comments, unless they help to read surrounding code
5) DRY code (js, css, and pug)
