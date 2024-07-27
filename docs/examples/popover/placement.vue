<template>
  <div class="wrap-base-box">
    <div class="row center">
      <fb-popper trigger="hover" :persistent="false" placement="top-start" :offset="5" :popper-style="{ width: '200px' }">
        <template #default>
          <fb-button plain class="box-item">top-start</fb-button>
        </template>
        <template #popup>
          <div class="popover">
            <div class="content">这就是内容，这就是内容，这就是内容</div>
          </div>
        </template>
      </fb-popper>
      <fb-popper trigger="hover" :persistent="false" placement="top" :offset="5" :popper-style="{ width: '200px' }">
        <template #default>
          <fb-button plain class="box-item">top</fb-button>
        </template>
        <template #popup>
          <div class="popover">
            <div class="content">这就是内容，这就是内容，这就是内容</div>
          </div>
        </template>
      </fb-popper>

      <fb-popper trigger="hover" :persistent="false" placement="top-end" :offset="5" :popper-style="{ width: '200px' }">
        <template #default>
          <fb-button plain class="box-item">top-end</fb-button>
        </template>
        <template #popup>
          <div class="popover">
            <div class="content">这就是内容，这就是内容，这就是内容</div>
          </div>
        </template>
      </fb-popper>
    </div>
    <div class="row">
      <fb-popper trigger="hover" :persistent="false" placement="left-start" :offset="5" :popper-style="{ width: '200px' }">
        <template #default>
          <fb-button plain class="box-item">left-start</fb-button>
        </template>
        <template #popup>
          <div class="popover">
            <div class="content">这就是内容，这就是内容，这就是内容</div>
          </div>
        </template>
      </fb-popper>

      <fb-popper trigger="hover" :persistent="false" placement="right-start" :offset="5" :popper-style="{ width: '200px' }">
        <template #default>
          <fb-button plain class="box-item">right-start</fb-button>
        </template>
        <template #popup>
          <div class="popover">
            <div class="content">这就是内容，这就是内容，这就是内容</div>
          </div>
        </template>
      </fb-popper>
    </div>
    <div class="row">
      <fb-popper trigger="hover" :persistent="false" placement="left" :offset="5" :popper-style="{ width: '200px' }">
        <template #default>
          <fb-button plain class="box-item">left</fb-button>
        </template>
        <template #popup>
          <div class="popover">
            <div class="content">这就是内容，这就是内容，这就是内容</div>
          </div>
        </template>
      </fb-popper>

      <fb-popper trigger="hover" :persistent="false" placement="right" :offset="5" :popper-style="{ width: '200px' }">
        <template #default>
          <fb-button plain class="box-item">right</fb-button>
        </template>
        <template #popup>
          <div class="popover">
            <div class="content">这就是内容，这就是内容，这就是内容</div>
          </div>
        </template>
      </fb-popper>
    </div>
    <div class="row">
      <fb-popper trigger="hover" :persistent="false" placement="left-end" :offset="5" :popper-style="{ width: '200px' }">
        <template #default>
          <fb-button plain class="box-item">left-end</fb-button>
        </template>
        <template #popup>
          <div class="popover">
            <div class="content">这就是内容，这就是内容，这就是内容</div>
          </div>
        </template>
      </fb-popper>
      <fb-popper trigger="hover" :persistent="false" placement="right-end" :offset="5" :popper-style="{ width: '200px' }">
        <template #default>
          <fb-button plain class="box-item">right-end</fb-button>
        </template>
        <template #popup>
          <div class="popover">
            <div class="content">这就是内容，这就是内容，这就是内容</div>
          </div>
        </template>
      </fb-popper>
    </div>
    <div class="row center">
      <fb-popper trigger="hover" :persistent="false" placement="bottom-start" :offset="5" :popper-style="{ width: '200px' }">
        <template #default>
          <fb-button plain class="box-item">bottom-start</fb-button>
        </template>
        <template #popup>
          <div class="popover">
            <div class="content">这就是内容，这就是内容，这就是内容</div>
          </div>
        </template>
      </fb-popper>
      <fb-popper trigger="hover" :persistent="false" placement="bottom" :offset="5" :popper-style="{ width: '200px' }">
        <template #default>
          <fb-button plain class="box-item">bottom</fb-button>
        </template>
        <template #popup>
          <div class="popover">
            <div class="content">这就是内容，这就是内容，这就是内容</div>
          </div>
        </template>
      </fb-popper>
      <fb-popper trigger="hover" :persistent="false" placement="bottom-end" :offset="5" :popper-style="{ width: '200px' }">
        <template #default>
          <fb-button plain class="box-item">bottom-end</fb-button>
        </template>
        <template #popup>
          <div class="popover">
            <div class="content">这就是内容，这就是内容，这就是内容</div>
          </div>
        </template>
      </fb-popper>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrap-base-box {
  width: 600px;
}
.wrap-base-box .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.wrap-base-box .center {
  justify-content: center;
}
.wrap-base-box .box-item {
  margin-top: 10px;
}

.popover {
  padding: 12px;
  background-color: white;
  border: 1px solid #e4e7ed;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  .title {
    color: #303133;
    font-size: 16px;
    margin-bottom: 12px;
  }
  .content {
    color: #606266;
    font-size: 14px;
  }
}
</style>
