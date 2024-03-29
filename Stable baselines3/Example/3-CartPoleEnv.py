# Multiprocessing: Unleashing the Power of Vectorized Environments
import gymnasium as gym

from stable_baselines3 import PPO
from stable_baselines3.common.vec_env import DummyVecEnv, SubprocVecEnv
from stable_baselines3.common.env_util import make_vec_env
from stable_baselines3.common.utils import set_random_seed


def make_env(env_id: str, rank: int, seed: int = 0):
    '''
    Utility function for multiprocessed env.

    :param env_id: the environment ID
    :param num_env: the number of environments you wish to have in subrocesses
    :param seed: the initial seed for RNG
    :param rank: index of the subprocess
    '''
    def _init():
        env = gym.make(env_id, render_mode="human")
        # "seed" parameter is used to generalise a random new state for the agent in the space
        env.reset(seed=seed+rank)
        return env
    set_random_seed(seed)
    return _init


if __name__ == '__main__':
    env_id = "CartPole-v1"
    # Number of the processes
    num_cpu = 4
    # 1. Create the vectorized environment
    # Create env for each process
    # There will 4 relative process appear in the window
    vec_env = SubprocVecEnv([make_env(env_id, i)for i in range(num_cpu)])
    # 2. Use PPO algorithm and MLP policy to train
    model = PPO("MlpPolicy", vec_env, verbose=1)
    # 3. Learning parameters
    model.learn(total_timesteps=25000, progress_bar=True)

    obs = vec_env.reset()
    for _ in range(1000):
        action, _states = model.predict(obs)
        obs, rewards, dones, info = vec_env.step(action)
        vec_env.render()
