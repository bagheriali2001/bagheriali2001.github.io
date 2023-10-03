# So, IDP Crawler? What's it?

So, I have been studying English for the IELTS exam for a few months, and I had plans to do the test early next month. But in my very wonderful country (Iran), there are always some problems. This time, the problem is that there is no time announcement on the IDP website (International Education Specialists) for the IELTS exam in October (Today is the 3rd of October). One way to find out the new time has been announced is to rely on others to find out; it is impossible because I am in a social media ban phase. Another way is checking it regularly, and it's not good for me due to thousands of open tabs in my browser. So, I decided to write a crawler to do this for me.

## What is a crawler?

A crawler is a program that goes to a website and gets information from it. It is like a human that goes to a website and reads it. But it is a program, and it is faster than a human. Some use it to collect Search engine data, and others to train AI models. I use it to get the time of the IELTS exam and notify people interested in it.

This is not a real "crawler". I found some `GET` routes in the IDP website source, so I decided to use them instead of crawling the website. It is more manageable and faster. But I still call it crawler.

## How it works?

It has two cron jobs, one to fetch tests (the data we need) and one to notify people. There is another one in case some new venue (test center) is added to the list. The last one runs daily, but the other two run every 30 minutes with 15 15-minute delays from each other. The reason is to wait for complete fetch (currently, the crawler is fetching test time data of 85 venues in 6 countries for the next four months), so the notification cron job can notify people with the latest data.

## What is the result?

The result is a website where you can register for an alert; an email will be sent when the time is announced. The website is [IDP Crawler](https://idpcrawl.bagheriali.dev). It is hosted on my server, and it is free to use. I hope it helps you. The source code is available on [GitHub](https://github.com/bagheriali2001/idp-crawl).

This was an enjoyable experience for me. Now, I can create my search engine. 😎