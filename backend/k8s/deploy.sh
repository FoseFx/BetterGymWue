kubectl create namespace bgw
kubectl create secret generic regcred --namespace=bgw --from-file=.dockerconfigjson=$HOME/.docker/config.json --type=kubernetes.io/dockerconfigjson
kubectl apply -f cert.yml --namespace bgw
kubectl apply -f deploy.yml --namespace bgw
