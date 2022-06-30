## Docker Build Image of service

````
docker build -t {user}/auth .
````


## Setup nginx service for local dev

Set-up local variable
In Mac
`````
/etc/host
add:
127.0.0.1 ticketing.dev
`````

## For develop set-up skaffold
 
this allows to raise all the images that we have configured in our infra 

`````
skaffold dev
`````

## For enviroment development, create a secret JWT in kubernete with command 

`````
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf

kubectl get secrets
`````

## Problem resolution

- if it does not let you open in the browser due to certificate problems
    - [ ] write thisisunsafe in navigator

- In the upcoming lecture, we will be adding the ingress-nginx service name and namespace to our axios request.
    - [ ] kubectl get services -n ingress-nginx  

- Specifying the host
    - [ ] kubectl get namespace
    - [ ] kubectl get service -n ingress-nginx
    - [ ] add in axios the route 'http://ingress-nginx.ingress-nginx.svc.cluster.local'
    
    1. The url should have the format `http://<SERVICENAME>.<NAMESPACE>.svc.cluster.local`

    2. The way to check existing namespaces is `kubectl get namespace`

    3. The way to check servicenames inside a namespace is `kubectl get services -n <NAMESPACE>`





