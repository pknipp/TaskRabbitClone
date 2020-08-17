"punch" list:
- Convert this file from a punch list to a readme.

STYLING:
- Suggestions?

A) MAJOR FUNCTIONALITY:
1) (stretch) provide a Tasker with almost all abilities of a user
  (creating a  account, logging in, participating in the
  job-scheduling negotiation, deleting a job, deleting themself)
2) If we don't want to do the stretch, then create an "admin" page
  with full CRUD-functionality for the Jobtype and Tasker Models.

B) MINOR FUNCTIONALITY (SPECIFIC):
1) (PK) incorporate UD functionality into jobs page
2) put nav links on all pages to places like home, account details,
  or jobs
4) (PK) on jobs page, create a three-set toggle which'll show
  the following jobs according to their #jobDate attribute:
  (a) all of them, (b) past, and (c) future
5) (PK) separate "account" route into front-end & back-end?
6) (PK) put csrf middleware into a couple of routes, both
  front and back?
7) PK things: allow user to delete job &/or modify jobDate, 
insert more nav links on each page, work on admin page,

C) MINOR FUNCTIONALITY (GENERAL):
1) remove any front-end console.logs
2) ensure that each view properly reflects whether user is logged in
3) if user is logged in, ensure that each page reflects that fact
4) ensure adequate authorization (req.user && req.user.id === req.params.id)
  on each (front-end?) route.  Otherwise, res.redirect elsewhere (login or home?)

D) HOUSEKEEPING:
1) shift image files "down" one level, as PK described earlier
2) delete superfluous paths
3) revisit naming conventions for paths?
4) delete comments, unless they help to read surrounding code
5) DRY code (js, css, and pug)
