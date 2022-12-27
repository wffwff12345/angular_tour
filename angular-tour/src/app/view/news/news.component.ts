import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import * as XLSX from 'xlsx';
import { store } from '../../store/store.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { saveAs } from 'file-saver';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {
  size = 5;
  state: any;
  state1: any;
  name: any;
  name1: any;
  list: Array<{ id: any; name: any; age: any }> = [];
  constructor(private messageService: NzMessageService,@Inject(LOCALE_ID) private locale: string) {
    this.state = store.getState();
    this.name = this.state.token;
  }

  ngOnInit(): void {
    this.state1 = store.getState();
    this.name1 = this.state.token;
    store.subscribe(() => {
      console.log('store中数据发生了变化');
    });
  }
  selectFile(event: any) {
    document.getElementById('upload')?.click();
    this.list = [];
  }
  fileChange(event: any) {
    const f = event.target as HTMLInputElement;
    const file = event.target.files[0];
    const type = file.name.split('.')[1];
    if (type !== 'xls' && type !== 'xlsx' && type !== 'csv') {
      this.messageService.error('请上传指定格式的文件');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = e.target['result'];
      const workbook: any = XLSX.read(data, { type: 'binary' });
      const sheetNames = workbook.SheetNames; // 工作表名称集合
      const worksheet = workbook.Sheets[sheetNames[0]]; // 读取第一张sheet
      let xlsxData = XLSX.utils.sheet_to_json(worksheet) || []; //excel数据
      console.log(xlsxData);
      //数据以页面需要的格式保存
      this.list = xlsxData.map((cell: any) => {
        return { id: cell['ID'], name: cell['NAME'], age: cell['AGE'] };
      });
    };
    console.log('start');
    reader.readAsBinaryString(file);
    console.log('end');
  }
  fileUrl(event: any) {
    document.getElementById('fileUrl')?.click();
  }
  url(event: any) {
    const type=['png','jpg','jpeg'];
    const suffix = event.target.files[0].name.split('.')[1];
    let url = window.URL.createObjectURL(event.target.files[0]);
    console.log(url);
    if(type.includes(suffix)){
      window.open(url, '_target');
    }
    const id = this.randomId();
    const dateId = formatDate(
      new Date(),
      'yyyyMMddHHmmss',
      this.locale || 'ja'
    )
    console.log(dateId)
    saveAs(event.target.files[0], `${dateId}.${suffix}`);
    window.URL.revokeObjectURL(url);
  }

  randomId() {
    const min = 1000000;
    const max = 9999999;
    const range = max - min;
    const random = Math.random();
    const result = Math.round(random * range) + min;
    return result;
  }
}
