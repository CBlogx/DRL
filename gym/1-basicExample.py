# gymnasium 为 gym的升级版
import gymnasium as gym
env = gym.make("LunarLander-v2", render_mode="human")
# 使用reset获取第一次观测的视角，这里可用seed参数作为特定的随机种子初始化环境
observation, info = env.reset()

for _ in range(1000):
    action = env.action_space.sample()  # agent policy that uses the observation and info
    # Agent每执行一个action即为step，每执行完一个action，环境（Agent的观察图像）发生更新。
    # 作为action执行的结果，Agent在更新后的环境接收到一个新的观察以及action的执行奖励。
    # 如果Agent发生终止行为（正常/不正常），step都会返回相应的信息
    # 同样如果希望在固定数量的时间步后结束环境会发出一个截断信号。如果终止或截断中的任何一个为true，则应该调用reset重启环境
    observation, reward, terminated, truncated, info = env.step(action)

    if terminated or truncated:
        observation, info = env.reset()

env.close()