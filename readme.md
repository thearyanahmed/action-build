## Action Build

Action Build is docker image build scripts using github actions and bitbucket pipeline and pushing them in AWS ECR.

Before we start, 
We need to create a repository on [AWS ECR](https://console.aws.amazon.com/ecr/repositories).

### github actions
Building with github actions requires us to create a `.github/workflows/` directory in the root of our project. We will call our file `ecr.yml`. 

Then,
```
git clone git@github.com:thearyanahmed/action-build.git
```

```
cd action-build
```

or you can simply copy the `ecr.yml` file and paste it in your project's `workflows` directory. 

The script looks for a `Dockerfile` on the root of your project, if its not present there, make sure the change it on `line 18` of `.github/workflows/ecr.yml` file. 

Also, we will only be building and pushing images when a push has been made into the `build-ecr` branch. You can change it from `.github/workflows/ecr.yml`'s `line 6`.

##### Build secrets
as we will need to login to aws from the action, we need a few secrets.
- `AWS_ECR_REPO` will be the repo name from `url/repo` . eg: If the repo is `$accountID.dkr.ecr.us-east-1.amazonaws.com/hello-world`, `AWS_ECR_REPO` will be `hello-world`.
- `AWS_ACCESS_KEY_ID` your aws access key.
- `AWS_SECRET_ACCESS_KEY` your aws secret key.
- `AWS_DEFAULT_REGION` the default region of your project, eg: `us-east-1`


You'll need to set the in your repository's secrets. So thats **Settings > Secrets > New Repository Secret**.

After setting these, 
git checkout to `build-ecr` branch or the branch you `chose for the deployment`.

**Now, for the tag versioning, the very last commit message will be used.**
For example, if I want to tag my image `1.38`, the very last commit message should be `1.38`. 

To finally build and push to ECR,

`git commit -m "1.38"; git push origin build-ecr`

### bitbucket pipeline

Same as above, we will be pushing on `build-ecr` branch, but you can change that from `line 8` of `bitbucket-pipeline.yml`.

##### Build secrets
- `AWS_DEFAULT_REGION` the default region of your project, eg: `us-east-1`
- `AWS_REGISTRY_URL` will be the long `url/repo` name. eg: `$accountID.dkr.ecr.us-east-1.amazonaws.com/hello-world` 
- `AWS_ACCESS_KEY_ID` your aws access key.
- `AWS_SECRET_ACCESS_KEY` your aws secret key.

**Now, for the tag versioning, the commit message will be used.**
For example, if I want to tag my image `1.38`, the commit message should be `1.38`. 

To finally build and push to ECR,

`git commit -m "1.38"; git push origin build-ecr`


A demo docker file has been added to test. 
