import gym

"""
 make()
 @breif: 生成环境对象
 @param[in]: id  ->  启用环境的名称
 @param[in]: render_mode  ->  渲染模式
    human: 在显示器或终端上渲染
    rgb_array: 返回像素图像的RGB阵列作为返回值
    ansi: 将文本作为返回值返回
 @retval: 环境对象
 env = gym.make(id:str, render_mode:str)
"""
env = gym.make("Tennis-v4", render_mode="human")
print("观测空间: ", env.observation_space)
print("动作空间", env.action_space)
print("动作数:", env.action_space.n)

state = env.reset()
print("初始状态:", state)
# print("当前状态:", env.state)

for i in range(5):
    action = env.action_space.sample()
    state, reward, done, info = env.step(action)
    print(
        "动作:",
        action,
        "当前状态:",
        state,
        "奖励:",
        reward,
        "是否结束:",
        done,
        "日志:",
        info,
    )

# obs = env.reset()
# for i in range(1000):
#     env.render()
#     action = env.action_space.sample()
#     obs, reward, done, info, _ = env.step(action)
env.close()

# print(gym.envs.registry.keys())
