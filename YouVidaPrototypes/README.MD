# Create Azure Kubernetes Service

# Connect to AKS with command line

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.3.0/deploy/static/provider/cloud/deploy.yaml

# Create a dns and link it to the public ip adress of your "ingress-nginx-controller" service in kubernetes.
Example given: 192.168.0.1

# Go to freenom.com and create an account and get a free domain. Then link the ip from the previous step.
Example given: bram.ml

# Change bram.ml to your domain

kubectl create ingress demo --class=nginx --rule bram.ml/=demo:80

# Apply yaml files

kubectl apply -f ./service.yaml --namespace ingress-nginx
kubectl apply -f ./deployment.yaml --namespace ingress-nginx
kubectl apply -f ./ingress.yaml --namespace ingress-nginx