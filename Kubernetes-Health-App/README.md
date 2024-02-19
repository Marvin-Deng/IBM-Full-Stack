# Kubernetes Health App

1. Export your namespace as an environment variable so that it can be used in subsequent commands.

```shell
export MY_NAMESPACE=sn-labs-$USERNAME
```

2. Build the health app using the Docker Build command.

```shell
docker build . -t us.icr.io/$MY_NAMESPACE/patient-ui:v1
```

3. Push the image to IBM Cloud Container Registry

```shell
docker push us.icr.io/$MY_NAMESPACE/patient-ui:v1
```

4. Verify that the image was pushed successfully.

```shell
ibmcloud cr images
```

5. After creating a deployment.yml file, apply the deployment

```shell
kubectl apply -f deployment.yml
```

6. Open a New Terminal and enter the below command to view your application

```shell
kubectl port-forward deployment.apps/patient-ui 8080:8080
```

## Autoscale using Horizontal Pod Autoscaler

1. Autoscale the health application deployment using `kubectl autoscale deployment`

```shell
kubectl autoscale deployment patient-ui --cpu-percent=5 --min=1 --max=10
```

2. Check the current status of the newly-made HorizontalPodAutoscaler

```shell
kubectl get hpa patient-ui
```

3. Open another new terminal and enter the below command to generate load on the app to observe the autoscaling

```shell
kubectl run -i --tty load-generator --rm --image=busybox:1.36.0 --restart=Never -- /bin/sh -c "while sleep 0.01; do wget -q -O- <your app URL>; done"
```

4. Run the below command to observe the replicas increase in accordance with the autoscaling

```shell
kubectl get hpa patient-ui --watch
```

5. Observe the details of the horizontal pod autoscaler
```shell
kubectl get hpa patient-ui
```

## Rolling Updates and Rollbacks

1. To see the history of deployment rollouts

```shell
kubectl rollout history deployment/patient-ui
```

2. To see the details of Revision of the deployment rollout

```shell
kubectl rollout history deployments patient-ui --revision=2
```

3. To undo the deploymnent and set it to Revision 1

```shell
kubectl rollout undo deployment/patient-ui --to-revision=1
```