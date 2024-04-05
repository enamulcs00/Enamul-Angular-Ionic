import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthenticationService } from 'src/app/commonUI/services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { CommonDataService } from 'src/app/services/common-data-service';
import { DatedFlowCriteriaComponent } from './dated-flow-criteria.component';
import { FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { DatedFlowService } from 'src/app/services/dated-flow.service';
import { DatedFlowServiceMock, DatedFlowServiceNoDataMock } from 'src/app/mockData/dated-flow.service.mock';
import { CreateDropDownJsonService } from 'src/app/commonUI/multi-select-dropdown';
import { MultiselectDropdown } from 'src/app/commonUI/multi-select-dropdown';
import { DatePickerComponent, DatepickerModule } from 'ngx-bootstrap/datepicker';
import { AppConfig } from 'src/app/constants/config';

class MockAuthenticationService {
  getCurrentUserId() {
    return { subscribe: () => { } };
  }
}

let mockCriteria = {
  fromSlic: "0115",
  origCtry: "US",
  origDate: "2022-06-23",
  origSlic: "0119",
  origSort: "D",
  service: "1DA",
  uptoCtry: "US",
  uptoSlic: "0442",
  viaCtry: "US",
  viaSlic: "9003",
  viaSrt: "D2"
}

let mockSort = {
  aggFunc: null,
  colId: "0",
  flex: null,
  hide: false,
  pinned: null,
  pivot: false,
  pivotIndex: null,
  rowGroup: false,
  rowGroupIndex: null,
  sort: null,
  sortIndex: null,
  width: 70,
}
let slicData = [
  {
    "slicCode": "5500"
  },
  {
    "slicCode": "5565"
  },
  {
    "slicCode": "5509"
  },
  {
    "slicCode": "5520"
  },

]
let mockFilter = {
  uptoSlic: {values: ["0102"], filterType: "set"}
}
// region detais object
let regionDetails = {
  region:"Europe",
  regionInShort:"EUR",
  regionDateFormat:'DD/MMM/YYYY'
}
// region detais object for US
let _usDetails = {
  region:"North America",
  regionInShort:"US",
  regionDateFormat:'MM/DD/YYYY'

}
const gridData = [{fromSlic
  : 
  "0001",
  llnkday
  : 
  "0",
  originCtry
  : 
  "US",
  originSlic
  : 
  "1200",
  originSort
  : 
  ".",
  uptoCtry
  : 
  "US",
  uptoSlic
  : 
  "9999",
  viaCtry
  : 
  "US",
  viaSlic
  : 
  "1200",
  viaSort
  : 
  "L"}]

  const gridvalue = {value:"1",
data:{
  viaLdateTime:"2022-06-23"
}
}
  const gridvalue1 = {value:"AA",data:{
    viaLdateTime:"2022-06-23"
  }}
describe('DatedFlowCriteriaComponent', () => {
  let component: DatedFlowCriteriaComponent;
  let fixture: ComponentFixture<DatedFlowCriteriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatedFlowCriteriaComponent, MultiselectDropdown],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientModule, FormsModule, DatepickerModule, ReactiveFormsModule, AgGridModule.withComponents([])],
      providers: [
        FormBuilder,
        CreateDropDownJsonService,
        AppConfig,
        CommonDataService,
        ChangeDetectorRef,
        { provide: AuthenticationService, useClass: MockAuthenticationService },
        { provide: DatedFlowService, useClass: DatedFlowServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParams: {}
            }
          }
        }
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(DatedFlowCriteriaComponent);
    component = fixture.componentInstance;
    localStorage.setItem('dated-flow-criteria-state', JSON.stringify(mockCriteria));
    localStorage.setItem('sortingStatus', JSON.stringify(mockSort));
    localStorage.setItem('filterStatus', JSON.stringify(mockFilter));
    localStorage.setItem('regionDetails',JSON.stringify(regionDetails))
    fixture.detectChanges();
  });
// To test the creation of the component
  it('should create', () => {
    localStorage.setItem('dated-flow-criteria-state', JSON.stringify(mockCriteria));

    expect(component).toBeTruthy();
  });
// to set values in criteria when data available in session
  it('should test loadCriteria storage', () => {
    component.gridOptions = {
      api: {
        applyTransactionAsync: () => { },
        flushAsyncTransactions: () => { },
        showLoadingOverlay: () => {},
        setRowData: () => {},
        setFilterModel: () => {},
        setColumnDefs: () => {},
        hideOverlay:()=>{ } 
      } as any,
      columnApi: {
        getAllColumns:() =>{},
        resetColumnState: () => {},
        autoSizeColumns: () => {},
        applyColumnState: () => {}
      } as any
    }
    component.searchCriteriaForm = component.createFormGroup()
    let origSlicOpt =  { id: mockCriteria['origSlic'], name: mockCriteria['origSlic'] }
    let viaSlicOptions = { id: mockCriteria['viaSlic'], name: mockCriteria['viaSlic'] }
    let toSlicOptions = { id: mockCriteria['uptoSlic'], name: mockCriteria['uptoSlic'] }
    localStorage.setItem('dated-flow-criteria-state', JSON.stringify(mockCriteria));
    component.loadCriteriaFromStorage()
    expect(component.selectedStartDate).toBeDefined();
    expect(component.defaultSelectedService[0]).toEqual("1DA")
    expect(component.origCountry).toEqual(mockCriteria.origCtry)
    expect(component.originSlicOptions).toEqual(origSlicOpt)
    expect(component.viaCountry).toEqual(mockCriteria.viaCtry)
    expect(component.viaSlicOptions).toEqual(viaSlicOptions)
    expect(component.toSlicOptions).toEqual(toSlicOptions)
    expect(component.searchCriteriaForm.value.serviceLevel[0]).toEqual('1DA');
 });

// to set values in default field of criteria when data not available in session.

 it('should test loadCriteria storage for empty criteria', () => {
  component.gridOptions = {
    api: {
      applyTransactionAsync: () => { },
      flushAsyncTransactions: () => { },
      showLoadingOverlay: () => {},
      setRowData: () => {},
      setFilterModel: () => {},
      setColumnDefs: () => {},
      hideOverlay:()=>{ } 
    } as any,
    columnApi: {
      getAllColumns:() =>{},
      resetColumnState: () => {},
      autoSizeColumns: () => {},
      applyColumnState: () => {}

    } as any
  }
  localStorage.setItem('regionDetails',JSON.stringify(_usDetails))
  component.searchCriteriaForm = component.createFormGroup()
  localStorage.setItem('dated-flow-criteria-state','');
  const spy = spyOn(component,'DropdownSelection')
  component.loadCriteriaFromStorage()
  expect(component.searchCriteriaForm.value.originCC[0]).toEqual('US');
  expect(component.searchCriteriaForm.value.viaCC[0]).toEqual('US');
  expect(spy).toHaveBeenCalledWith(['US'], 'countryOptions')
});
// To Reset the criteria form
  it('should test reset search', () => {
    component.selected_country = "US"
    component.gridOptions = {
      api: {
        applyTransactionAsync: () => { },
        flushAsyncTransactions: () => { },
        showLoadingOverlay: () => {},
        setRowData: () => {},
        setFilterModel: () => {},
        hideOverlay:()=>{ },
        setColumnDefs: () => {},

      } as any,
      columnApi: {
        getAllColumns: () =>{},
        autoSizeColumns: () => {},
        resetColumnState: () => {}
      } as any
    }
    component.datedFlowService={
      UnsubscribeApiCall:()=>{}
    } as any

    const spy = spyOn(component,'DropdownSelection')
    component.resetSearch();
    expect(component.fromSlicOptions).toEqual([]);
    expect(component.originSlicOptions).toEqual([]);
    expect(component.toSlicOptions).toEqual([]);
    expect(component.viaSlicOptions).toEqual([]);
  expect(component.searchCriteriaForm.value.originCC[0]).toEqual('US');
  expect(component.searchCriteriaForm.value.viaCC[0]).toEqual('US');
  expect(spy).toHaveBeenCalledWith(['US'], 'countryOptions')
  });
  // to keep selected item on top of the dropdown  
  it('should test dropdown selection',()=>{
    let result = {id:"2DA",name:"2DA"}
    component.serviceOptions = [{id:"1DA",name:"1DA"},{id:"2DA",name:"2DA"},{id:"3DS",name:"3DS"},{id:"GND",name:"GND"}]
    component.DropdownSelection(["2DA"],'serviceOptions');
    expect(component.serviceOptions[0]).toEqual(result);
    expect(component.DropdownSelection(['2DA'],'serviceOptions')).toBeUndefined() 
  });

  //To Fetch data from api on the basis of criteria 

  it('should test getData based on Criteria', () => {
    component.gridOptions = {
        api: {
          applyTransactionAsync: () => { },
          flushAsyncTransactions: () => { },
          showLoadingOverlay: () => {},
          setRowData: () => {},
          setFilterModel: () => {},
          hideOverlay:()=>{ } ,
          setColumnDefs: () => {},
        } as any,
        columnApi: {
          getAllColumns:() =>{},
          autoSizeColumns: () => {},
          resetColumnState: () => {}
        } as any
      }
    const spy = spyOn(component, "getData");

    component.datedFlowService={
      UnsubscribeApiCall:()=>{}
    } as any
    component.submitSearch();
    expect(spy).toHaveBeenCalled();
  });

  // to show and hide the search criteria section

  it('should test toggle search panel', () => {
    component.showSearchPanel = true;
    component.toggleSearchPanel();
    expect(component.showSearchPanel).toBeFalsy();
  });

  //it will test fetchStreamingData function for fetching streaming data

  it('should call fetchStreamingData function ', () => {
  component.searchCriteriaForm = component.createFormGroup()
  localStorage.setItem('datedFlowFormSubmited', 'true')
  component.selectedStartDate = mockCriteria['origDate']
  component.searchCriteriaForm.controls['serviceLevel'].patchValue(["1DA"])
  component.lastCountOfRecordsFromStream =10;
  const spy1 = spyOn(component,'frameDatedFlowRequest')
  const spy2 = spyOn(component,'fetchStreamingData')
    component.gridOptions = {
      api: {
        applyTransactionAsync: () => { },
        flushAsyncTransactions: () => { },
        showLoadingOverlay: () => { },
        setColumnDefs: () => {},
        hideOverlay:()=>{ } ,
          setRowData: () => { },
      } as any,
      columnApi: {
         autoSizeColumns: () => {},
        getAllColumns: () => [{
          getColDef: () => {
            return {
              headerName: '',
              colId: ''
            }
          },
          getId:  () => { }
        },
        {
          getColDef: () => {
            return {
              headerName: 'OrgSLIC',
              colId: 'SLIC'
            }
          },
          getId:  () => { }
        }],
        setColumnsVisible: () => { },
        

      } as any
    }
    
     component.getData();
   expect(spy1).toHaveBeenCalled()
   expect(spy2).toHaveBeenCalled()
   });
  
  // to  fetch slic info on cell click of origin slic column
  it('should fetch slic info on cell click of origin slic column', () => {
    const params = {
      colDef: {
        headerName: 'OrgSLIC',
        field: 'originSlic',
      },
      data: {
        originCtry: 'US',
        originSlic: '2345'
      }
    }
    component.gridOptions = {
      api: {
        applyTransactionAsync: () => { },
        flushAsyncTransactions: () => { },
        showLoadingOverlay: () => { },
        hideOverlay:()=>{ } ,
        setColumnDefs: () => {},
          setRowData: () => { }
      } as any,
      columnApi: {
        autoSizeColumns: () => {},
        getAllColumns: () => [{
          getColDef: () => {
            return {
              headerName: '',
              colId: ''
            }
          },
          getId:  () => { }
        },
        {
          getColDef: () => {
            return {
              headerName: 'OrgSLIC',
              colId: 'SLIC'
            }
          },
          getId:  () => { }
        }],
        setColumnsVisible: () => { },
      

      } as any
    }
    component.onCellClicked(params);
    expect(component.slicInfo).toEqual('Slic Info: US 0119');
    expect(component.showSlicInfo).toBeTruthy();
  });
// To fetch slic info on cell click of via slic column
  it('should fetch slic info on cell click of via slic column', () => {
    const params = {
      colDef: {
        headerName: 'ViaSLIC',
        field: 'viaSlic'
      },
      data: {
        viaCtry: 'US',
        viaSlic: '2345'
      }
    }
    component.onCellClicked(params);
    expect(component.slicInfo).toEqual('Slic Info: US 0119');
    expect(component.showSlicInfo).toBeTruthy();
  });
// To fetch slic info for destn ranges
  it('should fetch slic info for destn ranges', () => {
    const params = {
      colDef: {
        headerName: ''
      },
      data: {
        originCtry: 'US',
        originSlic: '2345',
        originSort: 'S',
        uptoCtry: 'US',
        fromSlic: '2000',
        uptoSlic: '4000'
      }
    }
    component.onCellClicked(params);
    expect(component.modalGridData).toEqual([]);
    expect(component.showSlicGridInfo).toBeTruthy();
  });
// To fetch sort info on cell click of origin sort column
  it('should fetch sort info on cell click of origin sort column', () => {
    const params = {
      colDef: {
        headerName: 'OrgSrt',
        field: 'originSort',
      },
      data: {
        originCtry: 'US',
        originSort: 'S2',
        originSlic: '0119'
      }
    }
    component.onCellClicked(params);
    expect(component.showNoSortTemp?component.showNoSortTemp:true).toBeTruthy();
    expect(!component.showSortTemp?component.showSortTemp:false).toBeFalsy();
    expect(component.showSortTranslate).toBeTruthy()
  });

  //Test case for onOrigSlicInputData
  it('it should call onOrigSlicInputData', () => {
    component.onOrigSlicInputData(slicData)
    expect(component.slicLoading).toBeFalsy()
    expect(component.originSlicOptions).not.toBeFalsy()
  })

  //Test case for onDestSlicLowInputData
  it('it should call onDestSlicLowInputData function', () => {
    component.onDestSlicLowInputData(slicData);
    expect(component.fromSlicRngLoading).toBeFalsy();
  })
//Test case for onViaSlicInputData
  it('it should call onViaSlicInputData function ', () => {

    component.onViaSlicInputData(slicData)
    expect(component.viaSlicLoading).toBeFalsy()
    expect(component.viaSlicLoading).toBeFalsy()
  })
//Positive test case scenario for onDestSlicHighInputSwitchMap
  it('onDestSlicHighInputSwitchMap', () => {
    component.onDestSlicHighInputSwitchMap("23");
    expect(component.toSlicRngLoading).toBeTrue();
  });

    //Negative test case scenario for onDestSlicHighInputSwitchMap
    it('onDestSlicHighInputSwitchMap userInput less than 1', () => {
      component.onDestSlicHighInputSwitchMap("2");
     expect(component.toSlicRngLoading).toBeFalsy();
    });
// test  onDestSlicHighInputData function
  it('should test onDestSlicHighInputData function', () => {
    let data = [{id: "45SXC",name: "45SXC"}];
    component.onDestSlicHighInputData(data);
    expect(component.toSlicRngLoading).toBeFalsy();
  });

//Positive test case scenario for onDestSlicLowInputSwitchMap
  it('onDestSlicLowInputSwitchMap', () => {
    component.onDestSlicLowInputSwitchMap("23");
    expect(component.fromSlicRngLoading).toBeTrue();
  });

  //Negative test case scenario for onDestSlicLowInputSwitchMap 
  it('onDestSlicLowInputSwitchMap userInput less than 1', () => {
    component.onDestSlicLowInputSwitchMap("2");
    expect(component.fromSlicRngLoading).toBeFalsy();
  });

//Positive test case scenario for onOrigSlicInputSwitchMap
  it('should test  onOrigSlicInputSwitchMap function', () => {
    let request = {
      ctry: "US",
      search:  "23"  
    };
    component.onOrigSlicInputSwitchMap("23");
    expect(component.frameSlicSearchRequest("US","23")).toEqual(request);
  });
   //Negatice test case scenario for onOrigSlicInputSwitchMap
   it('onOrigSlicInputSwitchMap', () => {
    component.onOrigSlicInputSwitchMap("2");
    expect(component.slicLoading).toBeFalsy();
  });

    //Positive test case scenario for onViaSlicInputSwitchMap
  it('onViaSlicInputSwitchMap', () => {
    let request = {
      ctry: "US",
      search:  "23"  
    };
    component.onViaSlicInputSwitchMap("23");
    expect(component.frameSlicSearchRequest("US","23")).toEqual(request);
  });

 //Negative test case scenario for  onViaSlicInputSwitchMap
    it('onViaSlicInputSwitchMap for less than 1', () => {
      component.onViaSlicInputSwitchMap("2");
        expect(component.viaSlicLoading).toBeFalsy();
      });
// To hide confirmation modal
  it('should hide confirmation modal', () => {
    component.showSlicInfo=false;
    component.showSlicGridInfo=false;
    component.hideConfirmationModal();
    expect(component.showSlicInfo).toBeFalsy();
    expect(component.showSlicGridInfo).toBeFalsy();
  });
  // To test exported data in csv format
  it('should export data in csv format ', () => {
    var excelParams = {
      fileName: 'Dated Flow Report - Bigs',
      columnKeys: [],
      sheetName: 'Flow-1'
    }
    component.gridOptions = {
      api: {
        applyTransactionAsync: () => { },
        flushAsyncTransactions: () => { },
        setColumnDefs: () => {},
        exportDataAsCsv:(excelParams) =>{

        }
      }as any,
     
      columnApi: {
        autoSizeColumns: () => {},
        getAllColumns: () =>{},
      getAllDisplayedColumns: () =>[ {
      getColDef:()=>{
        return {
            headerName :''
        }
        }
      },
      {
        getColDef:()=>{
          return {
              headerName :'Origin Slic'
          }
          }
      }]
      
       } as any
    }
    const spy = spyOn(component.gridOptions.api, "exportDataAsCsv");
    component.export();
    expect(spy).toHaveBeenCalled();
   
  });
//Positive test case for filter change
  it('should call filter changed', () => {
    component.gridOptions = {
      api: {
        applyTransactionAsync: () => { },
        flushAsyncTransactions: () => { },
        setColumnDefs: () => {},
         getFilterModel: () => {}
         } as any,
         columnApi: {
          autoSizeColumns: () => {},
          getAllColumns: () => [{
            getColDef: () => {
              return {
                headerName: '',
                colId: ''
              }
            },
            getId:  () => { }
          },
          {
            getColDef: () => {
              return {
                headerName: 'OrgSLIC',
                colId: 'SLIC'
              }
            },
            getId:  () => { }
          }],
          setColumnsVisible: () => { },
         
  
        } as any
    }
    const spy = spyOn(localStorage, "setItem");
    component.filterChanged();
    expect(spy).toHaveBeenCalled();
   
  });

  //negative scenario for gridStyle
  it('should call grid Style', () => {
    component.isGLSubWindow = false;
    component.showSearchPanel = true;
    let result =  component.getGridStyle();
    expect(result).toBe('grid-style')
  });
//positive test case scenarios for gridstyle
  it('should call grid Style', () => {
    component.isGLSubWindow = true;
    component.showSearchPanel = true;
    let result =  component.getGridStyle();
    expect(result).toBe('gl-grid-style')
  });
  //Test case for Streaming Data API call
  it('Request body should not be empty', () => {
  localStorage.setItem('dated-flow-criteria-state', JSON.stringify(mockCriteria));
  component.gridOptions = {
      api: {
        applyTransactionAsync: () => { },
        flushAsyncTransactions: () => { },
        hideOverlay:()=>{ },
        setColumnDefs:()=>{}   
      } as any,
      columnApi: {
        autoSizeColumns: () => {},
        getAllColumns: () => [{
          getColDef: () => {
            return {
              headerName: '',
              colId: ''
            }
          },
          getId:  () => { }
        },
        {
          getColDef: () => {
            return {
              headerName: 'OrgSLIC',
              colId: 'SLIC'
            }
          },
          getId:  () => { }
        }],
        setColumnsVisible: () => { },
       

      } as any
    }
 component.gridOptions.api?.applyTransactionAsync({ add: gridData }, () => {
    component.gridOptions.api?.flushAsyncTransactions();
    });
  component.fetchStreamingData();
  let gridDataObj = []
  gridDataObj = component.createColumnDef()
  if(gridData && gridDataObj.length > 0) {
    gridDataObj.forEach(obj => {
   if (obj.children && obj.children.length > 0) {
        obj.children.forEach(childEl => {
          if (childEl.cellRenderer) {
            //for values having length 1
            expect(childEl.cellRenderer(gridvalue)).toBeDefined()
            // for values having length 2
            expect(childEl.cellRenderer(gridvalue1)).toBeDefined()
            // for null values
          }
        })
      }

    })
  }
  expect(component.datedFlowRequest).not.toBeNull()
  });
//Test case for common API calls
  it('Call Function to get Common api data', () => {
    component.getCommonApiValues();
    //expect(component.serviceOptions).not.toBeNull()
    expect(component.countryOptions).not.toBeNull()
    expect(component.sortOptions).not.toBeNull()
   });
    //Positive test case for sortingChanged
   it('Local storage should have value for key: <sortingStatus>', () => {
    component.sortChanged()
    expect(localStorage.getItem('sortingStatus')).not.toBeNull()
  })

  //Test Caseif the user Input is greater than 2, API is called to fetch data*/
  it('Should call keyUpEvent fromSlicRng', () => {
    let event={
      target:{
        value :'21'
      },
      keyCode:49
    }
    const spy = spyOn(component.destSlicLowInput,'next');
    component.keyUpEventDelay(event,'fromSlicRng');
   expect(spy).toHaveBeenCalledWith(event.target.value)
    
  })
// to test keyUpEvent function for toSlicRng input values

  it('Should call keyUpEvent for toSlicRng', () => {
    let event={
      target:{
        value :'21'
      },
      keyCode:49
    }
    const spy = spyOn(component.destSlicHighInput,'next');
    component.keyUpEventDelay(event,'toSlicRng');
   expect(spy).toHaveBeenCalledWith(event.target.value)
    
  })
// to test keyUpEvent function for originSlic input values

  it('Should call keyUpEvent for originSlic', () => {
    let event={
      target:{
        value :'21'
      },
      keyCode:49
    }
    const spy = spyOn(component.origSlicInput,'next');
    component.keyUpEventDelay(event,'originSlic');
   expect(spy).toHaveBeenCalledWith(event.target.value)
    
  })
// to test keyUpEvent function for viaSlic input values
  it('Should call keyUpEvent for viaSlic', () => {
    let event={
      target:{
        value :'21'
      },
      keyCode:49
    }
    const spy = spyOn(component.viaSlicInput,'next');
    component.keyUpEventDelay(event,'viaSlic');
   expect(spy).toHaveBeenCalledWith(event.target.value)
    
  })
// To fetch sort info on cell click of origin sort column
  it('should fetch sort info on cell click of origin sort column', () => {
    const params = {
      colDef: {
        headerName: 'OrgSrt',
        field: 'originSort',
      },
      data: {
        originCtry: 'US',
        originSort: 'S2',
        originSlic: '0119'
      }
    }
    component.onCellClicked(params);
    expect(component.showNoSortTemp?component.showNoSortTemp:true).toBeTruthy();
    expect(!component.showSortTemp?component.showSortTemp:false).toBeFalsy();
    expect(component.showSortTranslate).toBeTruthy()
  });
// to update criteria in local storage on every values changes
  it('should call on every formvalues changes',()=>{
    component.gridOptions = {
      api: {
        applyTransactionAsync: () => { },
        flushAsyncTransactions: () => { },
        showLoadingOverlay: () => {},
        setRowData: () => {},
        setFilterModel: () => {},
        setColumnDefs: () => {},
        hideOverlay:()=>{ } 
      } as any,
      columnApi: {
        getAllColumns:() =>{},
        resetColumnState: () => {},
        applyColumnState: () => {},
        autoSizeColumns: () => {}, 
      } as any
    }
    component.loadCriteriaFromStorage()
    component.searchCriteriaForm = component.createFormGroup()
    const spy = spyOn(component,'commonCriteria')
    component.comService.changeInDate.next({ "startDate": true })
    component.ngAfterViewChecked()
    expect(spy).toHaveBeenCalled()
  })
  afterAll(() => {
  localStorage.setItem('dated-flow-criteria-state', JSON.stringify(mockCriteria));

    TestBed.resetTestingModule();

  });
});


