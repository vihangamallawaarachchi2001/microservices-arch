#!/bin/bash

# Your Docker Hub username
DOCKER_HUB_USERNAME="vihanm0120"

# Loop through all images and tag/push them
docker images --format "{{.Repository}}:{{.Tag}}" | while read -r image; do
  # Skip images that are not part of your microservices (e.g., <none>:<none>)
  if [[ "$image" == *"<none>"* ]]; then
    continue
  fi

  # Extract repository and tag
  repo=$(echo "$image" | cut -d':' -f1)
  tag=$(echo "$image" | cut -d':' -f2)

  # Create the new Docker Hub image name
  new_image="$DOCKER_HUB_USERNAME/$repo:$tag"

  # Tag the image
  echo "Tagging $image as $new_image"
  docker tag "$image" "$new_image"

  # Push the image to Docker Hub
  echo "Pushing $new_image to Docker Hub"
  docker push "$new_image"
done