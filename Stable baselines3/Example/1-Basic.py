import gymnasium as gym

from stable_baselines3 import A2C

# 创建gym环境
env = gym.make("CartPole-v1", render_mode="rgb_array")

'''
选定模型A2C算法，
MlpPolicy: 采用MLP策略
verbose: 
    Verbosity level: 
        0 for no output, 
        1 for info messages (such as device or wrappers used), 
        2 for debug messages
'''
model = A2C("MlpPolicy", env, verbose=1)
# 训练参数
model.learn(total_timesteps=10_000)

vec_env = model.get_env()
obs = vec_env.reset()
for i in range(1000):
    action, _state = model.predict(obs, deterministic=True)
    obs, reward, done, info = vec_env.step(action)
    vec_env.render("human")
    # VecEnv resets automatically
    # if done:
    #   obs = vec_env.reset()
