# Multiprocessing with off-policy algorithms
"""
When use off-policy algorithms, we should update the gradient_steps parameter as well.
et it to gradient_steps=-1 to perform as many gradient steps as transitions collected. 
There is usually a compromise between wall-clock time and sample efficiency.
"""
import gymnasium as gym

from stable_baselines3 import SAC
from stable_baselines3.common.env_util import make_vec_env

# Collect 4 transitions per call to `env_step`
# and performs 2 gradient steps per call to `env_step`
# if gradient_steps=-1, then we would do 4 gradients steps per call to `ènv.step()`
vec_env = make_vec_env("Pendulum-v1", n_envs=4, seed=0)
model = SAC("MlpPolicy", vec_env, train_freq=1, gradient_steps=2, verbose=1)
model.learn(total_timesteps=10000)