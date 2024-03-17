import torch
if torch.cuda.is_available():
    print("Using GPU")
else:
    print("Using CPU")
# Check for available GPUs
num_gpus = torch.cuda.device_count()
print("Number of available GPUs:", num_gpus)

# List all available GPUs
for i in range(num_gpus):
    print("GPU device", i, ":", torch.cuda.get_device_name(i))
