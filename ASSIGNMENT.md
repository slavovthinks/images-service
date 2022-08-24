At MYX we have terabytes of drone images that we need to store, organize and
efficiently extract as much useful information as (in)humanly possible from them. 

As a backend engineer, it will be your responsibility to make sure this process
goes smoothly.


# Problem description
Your task is to design a service that:
  1) Allows clients to upload / delete JPEG images through a REST API
  2) Can be queried to return all images inside a geographical bounding box, that is defined by min
     and max latitude/longitude. You can trust the EXIF information inside the JPEG.
  3) Can be queried to return the original image and thumbnail (256x256) version of it.

We recommend using NodeJS (Javascript) as the language for the backend and
either the filesystem + json or some RDBMS for storage, as those are the
technologies we currently use. The primary goals are simplicity and
efficiency. You can assume the system **won't be extended** much in terms of
functionality, but may be scaled up in terms of number of images stored and
number of concurrent users.

You can test with your own images or scraped from the internet. If this makes it
any easier for you, you can download [this archive from our ML
challenge](https://docs.myxrobotics.com/BIM-classification-small-dataset.zip),
it has plenty of images to test with.


# Goals
Simplicity. Couple hundred lines of code, one or two files, few dependencies. No
need for fancy OOP hierarchy or something like that. Bare minimum that works
reliably.

Testing. The simpler your solution, the less it will be needed :D. Maybe a 10
line client in bash will suffice, you decide what's best.

Efficiency. It is quite hard to be slow if you are simple, but be prepared to
answer what is the slow part of your solution, what can be improved if needed.
  1) How will the system behave with 1 thousand images? With 1 millon?
  2) How will the system behave with 1 concurent user? With 10? With 1000?

You **don't** need to overengineer your solutions for future needs that may
never be. Just have a plan how it could be scaled.



# Submission
[Email us](mailto:stanislav.nikolov@myxrobotics.com) if you make any progress, even
if you don't feel like your solution is as good as it could probably be; We're not
looking for months long unpaid labor :D.
If you have any questions, don't hesitate to get in touch with us!