#!/bin/bash
IMG=/home/z/my-project/public/images
# Batch 1
z-ai image -p "photorealistic photo of a professional electrician in navy blue work uniform and yellow hard hat installing a modern residential circuit breaker panel, bright laundry room, natural window light, shallow depth of field, professional trade photography" -o "$IMG/hero-2.jpg" -s 1344x768 > /dev/null 2>&1 &
P1=$!
z-ai image -p "photorealistic portrait of two professional electricians, a man and a woman in navy blue uniforms standing confidently with crossed arms in front of a service van, golden hour light, professional trade company photography" -o "$IMG/about-main.jpg" -s 864x1152 > /dev/null 2>&1 &
P2=$!
z-ai image -p "photorealistic closeup of electrician hands in work gloves using a digital multimeter to test wiring inside an open wall outlet, focus on hands and tools, warm indoor light" -o "$IMG/about-small.jpg" -s 1024x1024 > /dev/null 2>&1 &
P3=$!
z-ai image -p "photorealistic photo of electrician on ladder installing LED track lighting in a modern commercial office space with glass walls, professional trade photography, bright and clean" -o "$IMG/service-commercial.jpg" -s 1344x768 > /dev/null 2>&1 &
P4=$!
wait $P1 $P2 $P3 $P4
echo "batch1 done"
ls -la $IMG/hero-2.jpg $IMG/about-main.jpg $IMG/about-small.jpg $IMG/service-commercial.jpg
