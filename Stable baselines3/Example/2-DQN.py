# Basic Usage: Training, Saving, Loading
import gymnasium as gym

from stable_baselines3 import DQN
from stable_baselines3.common.evaluation import evaluate_policy

# 1. Create environment
env = gym.make("LunarLander-v2", render_mode="rgb_array")

# 2. Instantiate the agent
model = DQN("MlpPolicy", env, verbose=1)
# model = DQN("MlpPolicy", env, verbose=1, device="cuda")

# 3. Train the agent and display a progress bar
model.learn(total_timesteps=int(2e5), progress_bar=True)

# # 4. Save the agent
# model.save("dqn_lunar")

# # 5. Delete the trained model to demonstrate loading
# del model

# # 6. Load the trained model
# model = DQN.load("dqn_lunar", env=env)

# # 7. Evaluate the agent
# # When use wrappers with the environment that modify rewards,
# # this will be reflected here. To evaluate with original rewards,
# # wrap environment in a "Monitor" wrapper before other wrappers.
# mean_reward, std_reward = evaluate_policy(
#     model, model.get_env(), n_eval_episodes=10)

# # 8. Train model usage
# vec_env = model.get_env()
# obs = vec_env.reset()
# for i in range(1000):
#     action, _states = model.predict(obs, deterministic=True)
#     obs, rewards, dones, info = vec_env.step(action)
#     vec_env.render("human")

# 输出信息
# -----------------------------------------
# | rollout/                |             |
# |    ep_len_mean          | 25.1        | （平均每次eposide结束所需的动作次数）
# |    ep_rew_mean          | -1.63       | （平均奖励值）
# | time/                   |             | （性能反映）
# |    fps                  | 456         |
# |    iterations           | 16          |
# |    time_elapsed         | 71          |
# |    total_timesteps      | 32768       |
# | train/                  |             | （训练效果）
# |    approx_kl            | 0.005096923 |
# |    clip_fraction        | 0.0207      |
# |    clip_range           | 0.2         |
# |    entropy_loss         | -0.0347     |
# |    explained_variance   | 0.537       |
# |    learning_rate        | 0.0003      |
# |    loss                 | 0.0649      |
# |    n_updates            | 150         |
# |    policy_gradient_loss | -0.00937    |
# |    value_loss           | 0.208       |
# -----------------------------------------