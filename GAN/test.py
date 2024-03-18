import tensorflow as tf
import tensorflow_datasets as tfds
import matplotlib.pyplot as plt
import numpy as np

from tensorflow import keras
from keras.models import Sequential
from keras.layers import Dense, Dropout, Conv2D, LeakyReLU, Reshape, UpSampling2D

# 加载数据集
(ds_train, ds_test), ds_info = tfds.load(
    "fashion_mnist",
    download=False,
    split=["train", "test"],
    shuffle_files=True,
    as_supervised=True,
    with_info=True,
)
# 对image做标准化处理
def normalize_img(image, label):
    """Normalizes images: `uint8` -> `float32`."""
    return tf.cast(image, tf.float32) / 255.0, label


# 将图片进行映射
ds_train = ds_train.map(normalize_img, num_parallel_calls=tf.data.AUTOTUNE)
ds_train = ds_train.cache()
ds_train = ds_train.shuffle(ds_info.splits["train"].num_examples)
ds_train = ds_train.batch(128)
ds_train = ds_train.prefetch(tf.data.AUTOTUNE)

fig, ax = plt.subplots(ncols=4, figsize=(20, 20))
for idx in range(4):
    images = ds_train.as_numpy_iterator().next()[0]
    ax[idx].imshow(np.squeeze(images[127]))  # 获取每个batch的第一张图片
    ax[idx].title.set_text(idx)

# 构建生成器
def build_generator():
    model = Sequential()
    # 第一层，Dense表示全连接层
    model.add(Dense(7 * 7 * 128, input_dim=128))  # 7*7为图像大小，128通道的噪声
    model.add(LeakyReLU(0.2))  # 添加过滤器（激活函数）
    model.add(Reshape((7, 7, 128)))  # 图像输出

    # upsample 采样层1
    model.add(UpSampling2D())
    model.add(Conv2D(128, (5, 5), padding="same"))  # 添加卷积层
    model.add(LeakyReLU(0.2))  # 添加过滤器（激活函数）

    # upsample 采样层2
    model.add(UpSampling2D())
    model.add(Conv2D(128, (5, 5), padding="same"))
    model.add(LeakyReLU(0.2))

    # ConV 卷积层1
    model.add(Conv2D(128, (4, 4), padding="same"))
    model.add(LeakyReLU(0.2))

    # ConV 卷积层2
    model.add(Conv2D(128, (4, 4), padding="same"))
    model.add(LeakyReLU(0.2))

    # 输出层
    model.add(Conv2D(1, (4, 4), padding="same", activation="sigmoid"))

    return model

generator = build_generator()

imgs = generator.predict(np.random.randn(4, 128))
fig, ax = plt.subplots(ncols=4, figsize=(20, 20))
for idx in range(4):
    ax[idx].imshow(np.squeeze(imgs[127]))  # 获取每个batch的第一张图片
    ax[idx].title.set_text(idx)