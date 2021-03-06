## Docker Build Image of service in first place for all services created

````
docker build -t {user}/auth .
````

## Next to building image it publish in docker

`````
docker push {user}/auth  
`````


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

- if we want to start a service in a different port without having to configure anything we can do it with the option

`````
kubectl port-forward  <service ex: nats-depl-84d875cf5f-bzxd4>  <PORT> 4222:4222
`````

- if restart of pods, only delete
`````
kubectl get pods 

-nats-depl-84d875cf5f-bzxd4   

kubectl delete pod <service-pod> nats-depl-84d875cf5f-bzxd4   
`````

