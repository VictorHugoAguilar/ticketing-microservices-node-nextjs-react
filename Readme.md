# Docker Build Image of service

````
docker build -t {user}/auth .
````


# Setup nginx service for local dev

Set-up local variable
In Mac
`````
/etc/host
add:
127.0.0.1 ticketing.dev
`````

# For develop set-up skaffold
 
this allows to raise all the images that we have configured in our infra 

`````
skaffold dev
`````

## For enviroment development, create a secret JWT in kubernete with command 

`````
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf

kubectl get secrets
`````




