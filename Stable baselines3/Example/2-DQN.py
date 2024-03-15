# Basic Usage: Training, Saving, Loading
import gymnasium as gym

from stable_baselines3 import DQN
from stable_baselines3.common.evaluation import evaluate_policy

# 1. Create environment
env = gym.make("LunarLander-v2", render_mode="rgb_array")

# 2. Instantiate the agent
model = DQN("MlpPolicy", env, verbose=1, device="cuda")

# 3. Train the agent and display a progress bar
model.learn(total_timesteps=int(2e5), progress_bar=True)

# 4. Save the agent
model.save("dqn_lunar")

# 5. Delete the trained model to demonstrate loading
del model

# 6. Load the trained model
model = DQN.load("dqn_lunar", env=env)

# 7. Evaluate the agent
# When use wrappers with the environment that modify rewards,
# this will be reflected here. To evaluate with original rewards,
# wrap environment in a "Monitor" wrapper before other wrappers.
mean_reward, std_reward = evaluate_policy(
    model, model.get_env(), n_eval_episodes=10)

# 8. Train model usage
vec_env = model.get_env()
obs = vec_env.reset()
for i in range(1000):
    action, _states = model.predict(obs, deterministic=True)
    obs, rewards, dones, info = vec_env.step(action)
    vec_env.render("human")
