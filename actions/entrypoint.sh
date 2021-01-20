#!/bin/sh

set -e

echo "$KUBE_CONFIG" | base64 -d > /tmp/kubeconfig
export KUBECONFIG=/tmp/kubeconfig

exec /usr/bin/kubectl rollout restart deployment/$target
