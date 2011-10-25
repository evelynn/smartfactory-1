package com.mesplus.WIP.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mesplus.WIP.dao.OperationDao;
import com.mesplus.WIP.model.Operation;
import com.mesplus.smartfactory.HomeController;

@Controller
public class WIPController {
	private static final Logger logger = LoggerFactory
			.getLogger(HomeController.class);
	
	private OperationDao operationDao; 

	@Autowired
	public void setOperationDao(OperationDao operationDao) {
		this.operationDao = operationDao;
	}
	
	@RequestMapping(value = "module/WIP/data/operations.json", method = RequestMethod.GET)
	public @ResponseBody
	List<Operation> operations(HttpServletRequest request,
			HttpServletResponse response) {
		String factory_id = request.getParameter("factory_id");
		
		logger.info("factory_id : " + factory_id);
		
		return operationDao.selectOperations();
	}
//
//	
//
//	@RequestMapping(value = "module/WIP/data/operations.json", method = RequestMethod.GET)
//	public @ResponseBody
//	Operation[] operations(HttpServletRequest request,
//			HttpServletResponse response) {
//		String factory_id = request.getParameter("factory_id");
//		
//		logger.info("factory_id : " + request.getParameter("factory_id"));
//		return new Operation[] {
//			new Operation("1000", "operation 1000", factory_id),
//			new Operation("1000", "operation 1000", factory_id),
//			new Operation("1000", "operation 1000", factory_id),
//			new Operation("1000", "operation 1000", factory_id),
//			new Operation("1000", "operation 1000", factory_id),
//			new Operation("1000", "operation 1000", factory_id),
//			new Operation("1000", "operation 1000", factory_id),
//			new Operation("1000", "operation 1000", factory_id)
//		};
//	}
//
}
