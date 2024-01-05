# StackExchange Searcher

![StackExchange](https://i.imgur.com/xy1A1hh.png)

Welcome to StackExchange Searcher! This project was created to simplify the process of finding answers to your programming questions on Stack Overflow. Whether you're an experienced developer or just starting out, our intuitive search interface will assist you in discovering the solutions you need.

## Table of Contents
- [StackExchange Searcher](#stackexchange-searcher)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
    - [Effortless Search](#effortless-search)
    - [Custom Filters](#custom-filters)
  - [Getting Started](#getting-started)
      - [Cloning project](#cloning-project)
      - [Install dependencies](#install-dependencies)
    - [To run local dev server:](#to-run-local-dev-server)
    - [To build:](#to-build)
    - [To lint:](#to-lint)
  - [Technologies](#technologies)
  - [Usage](#usage)

## Features

### Effortless Search
StackExchange Searcher offers a user-friendly interface for quickly searching answers within Stack Overflow's extensive knowledge base. 

### Custom Filters
1. **Activity**: Choose between "Active," "Newest," and "Most Voted" to sort your search results accordingly.
2. **Creation Date**: Specify an exact date to filter answers posted on or after that date.
3. **Votes**: Define a minimum number of votes to filter answers with a certain level of community approval.
4. **Tags**: Enter specific tags to focus your search on particular technologies or topics.

## Getting Started
Follow these steps to get started with StackExchange Searcher.

#### Cloning project
1. Clone the repository: `https://github.com/DanyaGTx/stackexchange.git`
2. Navigate to the project directory: `cd stackexchange-searcher`

#### Install dependencies

```
npm install
```

### To run local dev server:

```
npm run dev
```

### To build:

```
npm run build
```

### To lint:

```
npm run lint
```

or to fix all problems

```
npm run lint:fix
```

## Technologies
- Vue 3 + Vite
- Vue Router
- Axios
- Tailwind CSS
- Element Plus

## Usage
1. Open StackExchange Searcher with npm run dev.
2. Enter your programming-related question in the search bar.
3. Browse through the search results and click on the most relevant questions to view their answers.
4. Utilize the filters section to narrow down your results based on activity, creation date, and votes.
5. To set specific tags, enter them in the "Tags" field before performing a search.
