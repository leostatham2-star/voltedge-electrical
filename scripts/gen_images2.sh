#!/bin/bash
IMG=/home/z/my-project/public/images
z-ai image -p "photorealistic photo of a professional electrician in navy blue work uniform and yellow hard hat installing a modern residential circuit breaker panel, bright laundry room, natural window light, professional trade photography" -o "$IMG/hero-2.jpg" -s 1344x768 > /tmp/gen_hero2.log 2>&1 &
P1=$!
z-ai image -p "photorealistic photo of electrician on ladder installing LED track lighting in a modern commercial office space with glass walls, professional trade photography, bright and clean" -o "$IMG/service-commercial.jpg" -s 1344x768 > /tmp/gen_comm.log 2>&1 &
P2=$!
z-ai image -p "photorealistic photo of a modern kitchen with elegant recessed ceiling lights turned on warm white, marble countertops, luxury home interior, real estate photography" -o "$IMG/project-4.jpg" -s 1344x768 > /dev/null 2>&1 &
P3=$!
z-ai image -p "photorealistic photo of electrician plugging in and testing a wall mounted EV charger in a tidy home garage, car visible, professional trade photography" -o "$IMG/project-5.jpg" -s 1344x768 > /dev/null 2>&1 &
P4=$!
wait $P1 $P2 $P3 $P4
echo "batch2 done"
ls -la $IMG/hero-2.jpg $IMG/service-commercial.jpg $IMG/project-4.jpg $IMG/project-5.jpg
