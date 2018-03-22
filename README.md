# react-apollo-todo-app

This is a basic todo app built on react. The app uses Hasura for its backend, leveraging the following features of Hasura:

- Deploy the react app
- Hasura Authentication the Auth UI Kit
- Hasura Database
- GraphQL queries provided by Hasura

# Pre-requisites

- Ensure that you have the [HasuraCLI](https://docs.hasura.io/0.15/manual/install-hasura-cli.html) installed on your local machine.
- Login into Hasura by running the following command on your command shell

```bash
hasura login
```

# Quickstart

## Getting the project

To get the project, run the following in your command shell:

```bash
hasura quickstart hasura/react-todo
```

## Deploying the project

Deploying the project is equivalent to pushing to a remote git repo

```bash
cd react-todo
git add . && git commit -m "Initial commit"
git push hasura master
```

## Opening the react app in your browser

After you are done deploying the project, you can open up the react app in your browser by:

```bash
hasura microservice open ui
```

# React App Code

You can find the code for the react app in the `microservices/ui/app` directory.

# Local Development

To run the app locally, you need to run the following inside the `microservices/ui/app` directory

```bash
REACT_APP_CLUSTER_NAME=<cluster-name> npm run start
```

Here, the `REACT_APP_CLUSTER_NAME` is the name of the cluster assigned to you when you quickstarted this project. To get the name of your cluster, run the following command inside the project directory:

```bash
hasura cluster status
```

This will print out the following output:

```bash
Cluster name:       blues54                       
Cluster alias:      hasura
Kubectl context:    blues54
Platform version:   v0.15.31
Cluster state:      Synced
```

`blues54` is the name of the cluster in this case, you will have a different name.

# Exploring Hasura Features

To explore the Hasura features, checkout our `hello-react` guide [here](https://hasura.io/hub/projects/hasura/hello-react).
