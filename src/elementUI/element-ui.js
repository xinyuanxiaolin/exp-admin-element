import {
    Container,
    Drawer,
    Aside,
    Header,
    Main,
    Alert,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Avatar,
    Card,
    Checkbox,
    Button,
    Input,
    Upload,
    Form,
    FormItem,
    Col,
    Row,
    TimeSelect,
    TimePicker,
    DatePicker,
    Table,
    TableColumn,
    Pagination,
    Tooltip,
    Select,
    Option,
    Menu,
    MenuItem,
    MenuItemGroup,
    Submenu,
    Carousel,
    CarouselItem,
    Radio,
    RadioGroup,
    RadioButton,
    Message,
    Cascader,
    Dialog,
    Tabs,
    TabPane,
    Divider,
    Timeline,
    Loading,
    TimelineItem,
    CheckboxGroup,
    Collapse,
    CollapseItem,
    MessageBox,
    Progress,
    Autocomplete,
    Switch,
    InputNumber,
    Link,
    Tag,
    Image,
    Breadcrumb,
    BreadcrumbItem,
    Tree,
} from "element-ui";

const element = {
    install: function (Vue) {
        Vue.use(Image);
        Vue.use(Drawer);
        Vue.use(Container);
        Vue.use(Aside);
        Vue.use(Header);
        Vue.use(Main);
        Vue.use(Alert);
        Vue.use(Dropdown);
        Vue.use(DropdownMenu);
        Vue.use(DropdownItem);
        Vue.use(Avatar);
        Vue.use(Button);
        Vue.use(Autocomplete);
        Vue.use(Collapse);
        Vue.use(CollapseItem);
        Vue.use(CheckboxGroup);
        Vue.use(Card);
        Vue.use(Dialog);
        Vue.use(Radio);
        Vue.use(RadioButton);
        Vue.use(RadioGroup);
        Vue.use(Checkbox);
        Vue.use(Carousel);
        Vue.use(CarouselItem);
        Vue.use(MenuItem);
        Vue.use(MenuItemGroup);
        Vue.use(Submenu);
        Vue.use(Menu);
        Vue.use(Input);
        Vue.use(Upload);
        Vue.use(Form);
        Vue.use(FormItem);
        Vue.use(Col);
        Vue.use(TimeSelect);
        Vue.use(TimePicker);
        Vue.use(DatePicker);
        Vue.use(Table);
        Vue.use(TableColumn);
        Vue.use(Pagination);
        Vue.use(Tooltip);
        Vue.use(Select);
        Vue.use(Option);
        Vue.use(Row);
        Vue.use(Cascader);
        Vue.use(Tabs);
        Vue.use(TabPane);
        Vue.use(Divider);
        Vue.use(Timeline);
        Vue.use(TimelineItem);
        Vue.use(Progress);
        Vue.use(Switch);
        Vue.use(Loading);
        Vue.use(InputNumber);
        Vue.use(Link);
        Vue.use(Tag);
        Vue.use(Breadcrumb);
        Vue.use(BreadcrumbItem);
      
        Vue.use(Tree);
        
        Vue.prototype.$message = Message;
        Vue.prototype.$msgbox = MessageBox;
        Vue.prototype.$alert = MessageBox.alert;
        Vue.prototype.$confirm = MessageBox.confirm;
        Vue.prototype.$prompt = MessageBox.prompt;
    },
};

export default element;
